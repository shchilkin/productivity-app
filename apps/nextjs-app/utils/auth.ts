import {fetcher} from "@/utils/api/fetcher";
import bcrypt from "bcrypt";
import {jwtVerify, SignJWT} from "jose";
import {db} from "@/utils/db";


export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
    bcrypt.compare(plainTextPassword, hashedPassword);

export const generateToken = async (user: any) => {
    const issuedAtTime = Math.floor(Date.now() / 1000);
    const expiresIn = issuedAtTime + 60 * 60 * 24 * 7; // 7 days

    // TODO: Type payload
    return new SignJWT({id: user.id, email: user.email})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setIssuedAt(issuedAtTime)
        .setNotBefore(issuedAtTime)
        .setExpirationTime(expiresIn)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export const verifyToken = async (token: string) => {
    // TODO: Type payload
    return await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
}

export const getUserFromCookie = async (cookies) => {
    const token = cookies.get(process.env.COOKIE_NAME);

    const {id} = await verifyToken(token);

    return await db.user.findUnique({
        where: {
            id
        }
    });
}

// TODO: Type user
export const register = (user: any) => fetcher('/api/register', 'POST', user)

// TODO: Type user
export const signIn = (user: any) => fetcher('/api/signin', 'POST', user)