export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-elema-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-elema-steel/20 bg-elema-soft p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-elema-steel">Política de privacidad</p>
        <h1 className="mt-4 text-4xl font-semibold text-elema-warm">Cómo tratamos tus datos.</h1>
        <div className="mt-6 space-y-5 text-base leading-8 text-elema-silver">
          <p>Los datos que ingresas en el formulario se utilizan para preparar el mensaje que tú decides enviar mediante WhatsApp. ELEMA no almacena esa información directamente en este sitio.</p>
          <p>La conversación se utiliza únicamente para responder consultas, evaluar proyectos, preparar propuestas y coordinar servicios relacionados.</p>
          <p>Puedes solicitar la corrección o eliminación de la información compartida contactándonos por el mismo canal.</p>
        </div>
      </div>
    </main>
  );
}
