import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/utils/db';
import { generateToken, hashPassword } from '@/utils/auth';
import { validateEmail } from '@/utils/validateEmail';
import { serialize } from 'cookie';

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.COOKIE_NAME === undefined) return new Error('COOKIE_NAME is undefined.');

  if (req.method === 'POST') {
    const { name, surname, email, password } = req.body;

    if (!validateEmail(email)) {
      return res.status(201).json({ error: 'Invalid email.' });
    }

    try {
      const user = await db.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (user) {
        return res.status(406).json({ error: 'User already exists.' });
      }

      // TODO: Implement strong password validation

      const newUser = await db.user.create({
        data: {
          email: email,
          password: await hashPassword(password),
          name: name,
          surname: surname,
        },
      });

      const token = await generateToken(newUser);

      res.setHeader(
        'Set-Cookie',
        serialize(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
        }),
      );

      return res.status(201).json({ 'message': 'User created.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
  }

  res.status(405).json({ error: `Method ${req.method} not allowed.` });
};

export default register;