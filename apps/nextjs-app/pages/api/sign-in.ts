import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/utils/db';
import { comparePasswords, generateToken } from '@/utils/auth';
import { serialize } from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.COOKIE_NAME === undefined) return new Error('COOKIE_NAME is undefined.');
  if (req.method === 'POST') {
    try {
      const user = await db.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        res.status(406).json({ error: 'User not found.' });
        return new Error('User not found.');
      }

      const isUser = await comparePasswords(req.body.password, user.password);
      console.log(req.body.password, user?.password);

      if (!isUser) res.status(406).json({ error: 'Invalid password.' });


      const token = await generateToken(user);

      res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        }),
      );
      res.status(201);
      res.json({"message": "logged in"});

      res.status(201).json({ message: 'logged in' });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  res.status(405).json({ error: `Method ${req.method} not allowed.` });
}