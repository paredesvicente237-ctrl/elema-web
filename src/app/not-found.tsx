import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#0b0b0b] px-4 pt-20 text-center text-[#f6efe6]">
      <div>
        <p className="text-[0.7rem] uppercase tracking-[0.38em] text-[#8f9296]">Error 404</p>
        <h1 className="mt-5 font-serif text-6xl">Este elemento no está en el conjunto.</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#bfc3c7]">La página que buscas pudo cambiar de lugar o ya no formar parte de ELEM.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="bg-[#f4f1ea] px-5 py-3 text-xs uppercase tracking-[0.22em] text-[#171717]">Volver al inicio</Link>
          <Link href="/tienda" className="border border-white/20 px-5 py-3 text-xs uppercase tracking-[0.22em]">Explorar elementos</Link>
        </div>
      </div>
    </main>
  );
}
