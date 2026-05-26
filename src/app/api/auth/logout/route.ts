import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/session';

export async function POST(request: Request) {
    try {
        await deleteSession();

        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl, { status: 303 }); 
        
    } catch (error) {
        return NextResponse.json(
            { message: 'Error al cerrar la sesión en el servidor.' },
            { status: 500 }
        );
    }
}