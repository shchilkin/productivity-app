import { fetcher } from '@/utils/api/fetcher';
import bcrypt from 'bcrypt';
import { jwtVerify, SignJWT } from 'jose';
import { User } from '@prisma/client';


export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainTextPassword: string, hashedPassword: string) =>
  bcrypt.compare(plainTextPassword, hashedPassword);

export const generateToken = async (user: User) => {
  const issuedAtTime = Math.floor(Date.now() / 1000);
  const expiresIn = issuedAtTime + 60 * 60 * 24 * 7; // 7 days

  // TODO: Type payload
  return new SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(issuedAtTime)
    .setNotBefore(issuedAtTime)
    .setExpirationTime(expiresIn)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const verifyToken = async (token: string) => {
  // TODO: Type payload
  return await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
};

// export const getUserFromCookie = async (cookies: RequestCookies) => {
//
//     if (process.env.COOKIE_NAME === undefined) return new Error('COOKIE_NAME is undefined.');
//
//     const token = cookies.get(process.env.COOKIE_NAME);
//
//     const {id} = await verifyToken(token);
//
//     return await db.user.findUnique({
//         where: {
//             id
//         }
//     });
// }