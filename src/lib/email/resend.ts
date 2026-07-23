type OrderEmail = {
  to: string;
  firstName: string;
  orderNumber: string;
  subtotal: number;
};

const apiUrl = 'https://api.resend.com';

async function resendRequest(path: string, body: Record<string, unknown>, method = 'POST') {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true };

  const response = await fetch(`${apiUrl}${path}`, {
    method,
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error(`Resend respondió ${response.status}`);
  return response.json();
}

export async function sendOrderConfirmation(order: OrderEmail) {
  const from = process.env.RESEND_FROM_EMAIL?.replace(/^ELEMA(?=\s*<)/i, 'ELEM');
  if (!from) return { skipped: true };

  return resendRequest('/emails', {
    from,
    to: [order.to],
    subject: `Recibimos tu pedido ${order.orderNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#171717;max-width:600px;margin:auto;padding:32px">
        <p style="letter-spacing:.18em;font-size:12px">ELEM</p>
        <h1 style="font-family:Georgia,serif;font-weight:400">Recibimos tu solicitud.</h1>
        <p>Hola ${escapeHtml(order.firstName)}, tu pedido <strong>${escapeHtml(order.orderNumber)}</strong> ya está en revisión.</p>
        <p>Subtotal referencial: <strong>$${order.subtotal.toLocaleString('es-CL')} CLP</strong>.</p>
        <p>Te contactaremos para confirmar disponibilidad, despacho y forma de pago. Puedes revisar el avance en Mi ELEM.</p>
      </div>`,
  });
}

export async function syncMarketingContact(contact: { email: string; firstName: string; lastName: string; subscribed: boolean }) {
  const segmentId = process.env.RESEND_MARKETING_SEGMENT_ID;
  if (!segmentId || !process.env.RESEND_API_KEY) return { skipped: true };

  try {
    return await resendRequest('/contacts', {
      email: contact.email,
      first_name: contact.firstName,
      last_name: contact.lastName,
      unsubscribed: !contact.subscribed,
      segments: [{ id: segmentId }],
    });
  } catch {
    // Si el contacto ya existe, Resend permite actualizarlo usando su correo.
    return resendRequest(`/contacts/${encodeURIComponent(contact.email)}`, {
      unsubscribed: !contact.subscribed,
    }, 'PATCH');
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]!);
}
