export const orderStatuses = {
  pending_confirmation: { label: 'Solicitud recibida', detail: 'Estamos validando disponibilidad y despacho.' },
  confirmed: { label: 'Pedido confirmado', detail: 'Tu pedido fue confirmado por ELEM.' },
  in_production: { label: 'En preparación', detail: 'Estamos preparando tu pedido.' },
  ready_for_dispatch: { label: 'Listo para despacho', detail: 'Tu pedido está listo para coordinar su entrega.' },
  shipped: { label: 'En camino', detail: 'El pedido fue entregado al transporte.' },
  delivered: { label: 'Entregado', detail: 'El pedido llegó a destino.' },
  cancelled: { label: 'Cancelado', detail: 'Este pedido fue cancelado.' },
} as const;

export type OrderStatus = keyof typeof orderStatuses;

export function formatClp(value: number) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(value);
}

export function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(new Date(value));
}
