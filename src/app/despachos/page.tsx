export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-3xl border border-black/10 bg-[#f8f5ef] p-8 shadow-[0_24px_70px_rgba(20,16,10,0.08)] sm:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-[#77716a]">Despachos y devoluciones</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight">Entrega coordinada para cada proyecto.</h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-[#57514b]">
          <p>Coordinamos entregas en Santiago y evaluamos despachos a regiones de acuerdo con las dimensiones, el peso y las condiciones de acceso.</p>
          <p>El costo, el embalaje, la descarga y cualquier instalación requerida se especifican antes de confirmar el pedido.</p>
          <p>Al tratarse de piezas fabricadas o configuradas a medida, cualquier cambio o devolución se evalúa según el avance de producción y las condiciones de la cotización aceptada.</p>
        </div>
      </div>
    </main>
  );
}
