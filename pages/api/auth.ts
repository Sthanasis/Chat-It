// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { secret } from '../../config';
import { MongoClient } from 'mongodb';
import { UserInputData } from '../../AppTypes';
import { catchAsync } from '../../utils/util';
import { to_Decrypt, to_Encrypt } from '../../aes';

export const config = {
  api: {
    externalResolver: true,
  },
};

const createUserHandler = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );

    const db = client.db();
    const userCollection = db.collection('users');

    const user: UserInputData = req.body;
    const encryptedPassword = to_Encrypt(user.password);
    user.password = encryptedPassword;

    let result = await userCollection.findOne({ email: user.email });
    if (result) {
      res.json({ ok: false, message: 'User exists', result, error: null });
      res.status(302).end();
    }

    result = await userCollection.insertOne(user);

    client.close();
    res.json({ ok: true, message: 'User inserted', result, error: null });
    res.status(201).end();
  }
);

const login = catchAsync(async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await MongoClient.connect(
    'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
  );
  const { email, password } = req.body;
  const db = client.db();
  const userCollection = db.collection('users');

  const user = await userCollection.findOne({ email });
  if (user) {
    if (to_Decrypt(user.password) === password) {
      const result = {
        token: jwt.sign(
          {
            email,
          },
          secret
        ),
        user,
      };

      res.json({ ok: true, result, error: null });
      res.status(200);
    } else {
      res.json({
        ok: false,
        error: 'Make sure you entered the correct password',
      });
      res.status(401);
    }
  } else {
    res.json({ ok: false, error: 'Invalid credentials' });
    res.status(401).end();
  }
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.login === 'true') {
    login(req, res);
  } else {
    createUserHandler(req, res);
  }
}
