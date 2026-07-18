import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Política de privacidad' };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#eee8de] px-4 pb-24 pt-28 text-[#171717] sm:px-6 lg:pt-36">
      <div className="mx-auto max-w-4xl border border-black/10 bg-[#f8f5ef] p-7 shadow-[0_25px_70px_rgba(20,16,10,0.08)] sm:p-12">
        <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#77716a]">Privacidad</p>
        <h1 className="mt-5 font-serif text-5xl sm:text-6xl">Cómo tratamos tus datos.</h1>
        <p className="mt-5 text-sm leading-7 text-[#69635d]">Esta política describe el tratamiento de información en los formularios, compras y cuentas de ELEMA.</p>

        <div className="mt-10 space-y-9 text-sm leading-7 text-[#57514b]">
          <PolicySection title="Datos que utilizamos">
            Al crear una cuenta o solicitar una compra podemos almacenar nombre, correo, teléfono, dirección de entrega, detalle del pedido y sus actualizaciones. La contraseña es administrada por nuestro proveedor de autenticación y ELEMA no puede verla.
          </PolicySection>
          <PolicySection title="Para qué los utilizamos">
            Usamos estos datos para autenticar tu acceso, gestionar solicitudes y pedidos, coordinar pagos y despachos, responder consultas, prevenir usos indebidos y mantener el historial visible en Mi ELEMA.
          </PolicySection>
          <PolicySection title="Correos comerciales">
            Solo enviaremos publicidad cuando marques de forma separada que quieres recibirla. Puedes retirar esa autorización desde Mi ELEMA o mediante el mecanismo de cancelación incluido en cada comunicación. Cancelar publicidad no impide recibir correos necesarios sobre un pedido activo.
          </PolicySection>
          <PolicySection title="Proveedores y seguridad">
            Para operar la plataforma podemos utilizar servicios especializados de infraestructura, autenticación y correo. Aplicamos controles de acceso para que cada cliente consulte únicamente la información asociada a su cuenta.
          </PolicySection>
          <PolicySection title="Tus solicitudes">
            Puedes pedir acceso, corrección o eliminación de tus datos a través de los canales publicados en la página de contacto. Algunos antecedentes de transacciones podrían conservarse cuando exista una obligación aplicable o sean necesarios para resolver una relación vigente.
          </PolicySection>
        </div>
      </div>
    </main>
  );
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-t border-black/10 pt-6"><h2 className="font-serif text-3xl text-[#171717]">{title}</h2><p className="mt-3">{children}</p></section>;
}
