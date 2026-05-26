import {getSession} from '@/lib/session';
import {redirect} from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function DashboardPage(){
    const session = await getSession();

    if(!session){
        redirect('/login');
    }

    return(
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Barra de navegacion */}
            <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm">
                <span className="font-bold text-gray-800 text-lg">Panel de Control</span>

                {/*Formulario nativo*/}
                <form action="/api/auth/logout" method="POST">
                    <button
                        type="submit"
                        className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl text-sm font-medium transition"
                    >
                        Cerrar Sesión
                    </button>
                </form>
            </nav>
            {/* Contenido */}
            <main className="flex-1 p-8 max-w-4xl mx-auto w-full">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        ¡Bienvenido de nuevo, {String(session.username)}!
                    </h1>

                    <div className="border-t border-gray-100 pt-4 space-y-3">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                            Detalles técnicos de la sesión
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs font-mono text-gray-700 space-y-1">
                            <p><span className="font-semibold text-blue-600">ID Usuario:</span> {String(session.userId)}</p>
                            <p><span className="font-semibold text-blue-600">Username:</span> {String(session.username)}</p>
                            <p><span className="font-semibold text-blue-600">Expiración:</span> {String(session.expires)}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}