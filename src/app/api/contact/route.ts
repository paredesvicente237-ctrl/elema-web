import { NextResponse } from 'next/server';
import { sendContactInquiry, type ContactInquiry } from '@/lib/email/resend';

type ContactRequest = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  region?: unknown;
  commune?: unknown;
  clientType?: unknown;
  projectType?: unknown;
  interest?: unknown;
  budget?: unknown;
  estimatedDate?: unknown;
  message?: unknown;
  privacyAccepted?: unknown;
  website?: unknown;
};

const requestWindows = new Map<string, { count: number; resetAt: number }>();
const windowDuration = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;

export async function POST(request: Request) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: 'Recibimos demasiados intentos. Espera unos minutos o contáctanos por WhatsApp.' },
      { status: 429 },
    );
  }

  const body = await request.json().catch(() => null) as ContactRequest | null;
  if (!body) return NextResponse.json({ error: 'No pudimos leer la consulta.' }, { status: 400 });

  // Campo señuelo: responde como si hubiese funcionado sin generar correo.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  const inquiry: ContactInquiry = {
    firstName: requiredField(body.firstName, 2, 80) ?? '',
    lastName: requiredField(body.lastName, 2, 80) ?? '',
    email: requiredField(body.email, 5, 254)?.toLowerCase() ?? '',
    phone: optionalField(body.phone, 30),
    region: optionalField(body.region, 100),
    commune: optionalField(body.commune, 100),
    clientType: optionalField(body.clientType, 80),
    projectType: optionalField(body.projectType, 80),
    interest: optionalField(body.interest, 160),
    budget: optionalField(body.budget, 100),
    estimatedDate: optionalField(body.estimatedDate, 100),
    message: optionalField(body.message, 1200),
  };

  if (
    !inquiry.firstName
    || !inquiry.lastName
    || !isEmail(inquiry.email)
    || body.privacyAccepted !== true
  ) {
    return NextResponse.json(
      { error: 'Revisa tu nombre, correo y la aceptación de privacidad.' },
      { status: 400 },
    );
  }

  try {
    const result = await sendContactInquiry(inquiry);
    if ('skipped' in result && result.skipped) {
      return NextResponse.json(
        { error: 'El correo de contacto aún no está configurado. Puedes continuar por WhatsApp.' },
        { status: 503 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'No pudimos enviar la consulta en este momento. Puedes continuar por WhatsApp.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

function requiredField(value: unknown, min: number, max: number) {
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean.length >= min && clean.length <= max ? clean : null;
}

function optionalField(value: unknown, max: number) {
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean ? clean.slice(0, max) : null;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const key = forwardedFor || request.headers.get('x-real-ip') || 'unknown';
  const current = requestWindows.get(key);

  if (!current || current.resetAt <= now) {
    requestWindows.set(key, { count: 1, resetAt: now + windowDuration });
    pruneExpiredWindows(now);
    return false;
  }

  current.count += 1;
  return current.count > maxRequestsPerWindow;
}

function pruneExpiredWindows(now: number) {
  if (requestWindows.size < 250) return;
  requestWindows.forEach((value, key) => {
    if (value.resetAt <= now) requestWindows.delete(key);
  });
}
