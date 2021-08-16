// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { secret } from '../../config';
import { MongoClient } from 'mongodb';
import { User } from '../../AppTypes';
import { catchAsync } from '../../utils/util';

const createUserHandler = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const client = await MongoClient.connect(
        'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
      );
      const user: User = req.body;
      const db = client.db();
      const userCollection = db.collection('users');
      let result = await userCollection.findOne({ email: user.email });
      if (result) {
        res
          .status(401)
          .json({ ok: false, message: 'User exists', result, error: null });
        return;
      }

      result = await userCollection.insertOne(user);

      client.close();
      res
        .status(201)
        .json({ ok: true, message: 'User inserted', result, error: null });
    } catch (err) {
      console.log({ err });
    }
  }
);

const login = catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await MongoClient.connect(
    'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
  );
  const { username, password } = req.body;
  const db = client.db();
  const userCollection = db.collection('users');

  const user = await userCollection.findOne({ username });
  if (user) {
    if (user.password === password) {
      const result = {
        token: jwt.sign(
          {
            username,
            admin: username === 'admin' && password === 'admin',
          },
          secret
        ),
        user,
      };

      res.status(200).json({ ok: true, result, error: null });
    } else {
      res.status(401).json({
        ok: false,
        error: 'Make sure you entered the correct password',
      });
    }
  } else {
    res.status(401).json({ ok: false, error: 'Invalid credentials' });
  }
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.login === 'true') {
    login(req, res);
  } else {
    createUserHandler(req, res);
  }
}
