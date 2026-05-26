import Link from 'next/link';

export default function HomePage(){
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="max-w-xl p-8 bg-white rounded-2xl shadow-sm border border-gray-200">
        <h1 className= "text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-4">
          Bienvenido a Web Next.js
          </h1>
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadown-sm hover:bg-blue-500 transition"
              >
                Ir al Inicio de Sesión
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition"
              >
                Probar Ruta Privada
            </Link>
          </div>
      </div>
    </main>
  );
}