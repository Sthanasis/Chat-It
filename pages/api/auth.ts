// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { secret } from '../../config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 404;
    res.end('Error');
    return;
  }

  const { username, password } = req.body;
  console.log(username, password);
  res.json({
    token: jwt.sign(
      {
        username,
        admin: username === 'admin' && password === 'admin',
      },
      secret
    ),
  });
}
