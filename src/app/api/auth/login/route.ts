import {NextResponse} from 'next/server';
import {loginSchema} from '@/lib/validation';
import {mockDatabase, verifyPassword} from '@/lib/auth';
import {createSession} from '@/lib/session';

export async function POST(request: Request){
    try{
        const body = await request.json();

        const result = loginSchema.safeParse(body);
        if(!result.success){
            return NextResponse.json(
                { message: 'Datos de entrada invalidos'},
                {status: 400}
            );
        }

        const {username, password} = result.data;

        if(username !== mockDatabase.user.username) {
            return NextResponse.json(
                {message: 'Usuario o contraseña incorrectos.'},
                {status: 401}
            );
        }

        const isPasswordCorrect = await verifyPassword(password, mockDatabase.user.passwordHash);
        if(!isPasswordCorrect){
            return NextResponse.json(
                {message: 'Ususario o contraseña incorrectos.'},
                {status: 401}
            );
        }

        await createSession(mockDatabase.user.id, mockDatabase.user.username);

        return NextResponse.json(
            {message: 'Inicio de sesión exitoso.', user: {username: mockDatabase.user.username}},
            {status: 200}
        );
    }catch (error){
        return NextResponse.json(
            {message: 'Error en el servidor.'},
            {status: 500}
        );
    }
}