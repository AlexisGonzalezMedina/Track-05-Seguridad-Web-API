import { z } from 'zod';

export const loginSchema = z.object({
    username: z
        .string()
        .min(3, {message: 'El usuario debe tener al menos 3 caracteres'})
        .max(20, {message: 'El usuario no puede tener más de 20 caracteres'})
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: 'El usuario solo puede contener letras, números y guiones bajos',
        }),
    password: z
    .string()
    .min(8, {message: 'La contraseña debe tener al menos 8 caracteres'})
    .max(32, {message: 'La contraseña es demasiado larga' }),
});