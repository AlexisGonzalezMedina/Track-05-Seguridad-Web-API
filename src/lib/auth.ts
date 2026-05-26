import bcrypt from "bcryptjs";


export const mockDatabase = {
    user: {
        id: 'usr_25052026',
        username: 'admin',
        passwordHash: '$2b$10$BztJam6IWHLmwC5kl3FK2uvoj0smEwOLvNrmiD2kFV/0/u3a2uW4C',
        role: 'administrador'
    }
};

export async function verifyPassword(passwordPlain: string, hash: string): Promise<boolean>{
    return bcrypt.compare(passwordPlain, hash);
}