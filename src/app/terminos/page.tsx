export default function TermsPage() {
  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Términos y condiciones</p>
        <h1 className="mt-4 text-4xl font-semibold text-elema-warm">Condiciones de cotización y fabricación.</h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-elema-silver">
          <p>Las imágenes, configuraciones, dimensiones y precios publicados son referenciales hasta la emisión de una cotización formal.</p>
          <p>Cada propuesta define alcance, materiales, terminaciones, plazos, forma de pago, despacho, instalación y garantías aplicables al proyecto.</p>
          <p>La fabricación comienza una vez aprobadas las especificaciones técnicas y las condiciones indicadas en la cotización correspondiente.</p>
        </div>
      </div>
    </main>
  );
}
