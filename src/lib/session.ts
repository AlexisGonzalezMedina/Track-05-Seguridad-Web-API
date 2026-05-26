import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || 'fallback_secrect_key_32_chars_minium');
const COOKIE_NAME = 'session_secure_token';

export async function encrypt(payload: any){
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(SECRET_KEY);
}

export async function decrypt(input: string){
    try {
        const {payload} = await jwtVerify(input, SECRET_KEY, {
            algorithms: ['HS256'],
        });
        return payload;
    }catch (error) {
        return null;
    }
}

export async function createSession(userId: string, username: String){
    const expires = new Date(Date.now()+ 60 * 60 * 1000);
    const session = await encrypt({ userId, username, expires});

    cookies().set(COOKIE_NAME, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: expires,
        path: '/',
    });
}

export async function deleteSession(){
    cookies().set(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
    });
}

export async function getSession() {
    const sessionCookie = cookies().get(COOKIE_NAME)?.value;
    if (!sessionCookie) return null;
    return await decrypt(sessionCookie);
}