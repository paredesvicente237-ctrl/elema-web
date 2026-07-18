export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-32 text-[#171717] sm:px-6 lg:px-8 lg:pt-40">
      <div className="mx-auto max-w-3xl border border-black/10 bg-[#f8f5ef] p-8 shadow-[0_24px_70px_rgba(20,16,10,0.08)] sm:p-12">
        <p className="text-sm uppercase tracking-[0.35em] text-[#77716a]">Términos y condiciones</p>
        <h1 className="mt-4 font-serif text-5xl leading-tight">Condiciones de cotización y fabricación.</h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-[#57514b]">
          <p>Los productos identificados como disponibles muestran su precio vigente. Las piezas conceptuales, configuraciones personalizadas, dimensiones especiales y servicios de instalación requieren una cotización formal.</p>
          <p>Cada propuesta define alcance, materiales, terminaciones, plazos, forma de pago, despacho, instalación y garantías aplicables al proyecto.</p>
          <p>La fabricación comienza una vez aprobadas las especificaciones técnicas y las condiciones indicadas en la cotización correspondiente.</p>
        </div>
      </div>
    </main>
  );
}
