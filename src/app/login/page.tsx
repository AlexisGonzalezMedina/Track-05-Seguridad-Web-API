'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const response = await fetch('/api/auth/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión.');
            }

            window.location.href = '/dashboard';
        }catch (err: any){
            setError(err.message);
        }finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                    Iniciar Sesión
                </h2>

                {error && (
                    <div className="p-3 mb-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Usuario
                        </label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                            placeholder="Ingrese su usuario"/>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input 
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm"
                            placeholder="Ingrese su contraseña"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition disabled:opacity-50 mt-2 shadow-sm"
                    >
                        {loading ? 'verificando...' : 'Entrar al Sistema'}
                    </button>
                </form>
            </div>
        </main>
    );
}