type OrderEmail = {
  to: string;
  firstName: string;
  orderNumber: string;
  subtotal: number;
};

export type ContactInquiry = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  region: string | null;
  commune: string | null;
  clientType: string | null;
  projectType: string | null;
  interest: string | null;
  budget: string | null;
  estimatedDate: string | null;
  message: string | null;
};

const apiUrl = 'https://api.resend.com';

async function resendRequest(path: string, body: Record<string, unknown>, method = 'POST') {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { skipped: true as const };

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

export async function sendContactInquiry(inquiry: ContactInquiry) {
  const from = process.env.RESEND_FROM_EMAIL?.replace(/^ELEMA(?=\s*<)/i, 'ELEM');
  const to = contactRecipient();
  if (!from || !to) return { skipped: true as const };

  const location = [inquiry.commune, inquiry.region].filter(Boolean).join(', ') || 'No indicada';

  return resendRequest('/emails', {
    from,
    to: [to],
    reply_to: inquiry.email,
    subject: 'Nueva consulta de proyecto desde ELEM',
    html: `
      <div style="font-family:Arial,sans-serif;color:#171717;max-width:680px;margin:auto;padding:32px">
        <p style="letter-spacing:.18em;font-size:12px">ELEM · NUEVA CONSULTA</p>
        <h1 style="font-family:Georgia,serif;font-weight:400">Elementos para un nuevo proyecto.</h1>
        <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6">
          ${emailRow('Nombre', `${inquiry.firstName} ${inquiry.lastName}`)}
          ${emailRow('Correo', inquiry.email)}
          ${emailRow('Teléfono', inquiry.phone ?? 'No indicado')}
          ${emailRow('Ubicación', location)}
          ${emailRow('Tipo de cliente', inquiry.clientType ?? 'No indicado')}
          ${emailRow('Tipo de proyecto', inquiry.projectType ?? 'No indicado')}
          ${emailRow('Elemento de interés', inquiry.interest ?? 'No indicado')}
          ${emailRow('Presupuesto', inquiry.budget ?? 'No indicado')}
          ${emailRow('Fecha estimada', inquiry.estimatedDate ?? 'No indicada')}
        </table>
        <div style="margin-top:24px;border-top:1px solid #ded8cf;padding-top:20px">
          <p style="margin:0 0 8px;font-size:12px;letter-spacing:.12em;color:#6d675f">MENSAJE</p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.7">${escapeHtml(inquiry.message ?? 'Sin mensaje adicional')}</p>
        </div>
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

function contactRecipient() {
  const explicit = process.env.ELEM_CONTACT_EMAIL?.trim();
  if (explicit) return explicit;

  return (process.env.ELEM_ADMIN_EMAILS ?? process.env.ELEMA_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim())
    .find(Boolean);
}

function emailRow(label: string, value: string) {
  return `<tr>
    <td style="width:34%;border-top:1px solid #ded8cf;padding:10px 12px 10px 0;color:#6d675f">${escapeHtml(label)}</td>
    <td style="border-top:1px solid #ded8cf;padding:10px 0">${escapeHtml(value)}</td>
  </tr>`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]!);
}
