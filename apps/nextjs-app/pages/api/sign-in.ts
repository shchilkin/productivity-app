import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/utils/db';
import { comparePasswords, generateToken } from '@/utils/auth';
import { serialize } from 'cookie';

const signIn = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.COOKIE_NAME === undefined) return new Error('COOKIE_NAME is undefined.');

  if (req.method === 'POST') {
    try {
      const user = await db.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        return res.status(406).json({ error: 'User not found.' });
      }

      const isUser = await comparePasswords(req.body.password, user.password);

      if (isUser) {
        const token = await generateToken(user);
        return res.setHeader(
          'Set-Cookie',
          serialize(process.env.COOKIE_NAME, token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          }),
        ).status(201).json({ 'message': 'success' });
      } else {
        return res.status(201).json({ 'message': 'wrong password' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: JSON.stringify(error), message: 'error occur' });
    }
  }
  res.status(405).json({ error: `Method ${req.method} not allowed.` });
};

export default signIn;