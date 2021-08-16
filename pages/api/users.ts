import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { User } from '../../AppTypes';
import { catchAsync } from '../../utils/util';

const getUserHandler = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );
    const email: string = req.body;
    const db = client.db();
    const userCollection = db.collection('users');
    const result = await userCollection.findOne({ email });
    if (result) {
      res
        .status(200)
        .json({ ok: true, message: 'User found', result, error: null });
    } else {
      res
        .status(200)
        .json({ ok: true, message: 'User not found', error: null });
    }
  }
);

const getAllUsersHandler = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );
    const db = client.db();
    const userCollection = db.collection('users');
    const result: User[] = await userCollection.find({}).toArray();
    const users = result.map((u) => {
      return {
        username: u.username,
        uid: u.uid,
        email: u.email,
        firstname: u.firstname,
        lastname: u.lastname,
        gender: u.gender,
        age: u.age,
      };
    });
    res
      .status(200)
      .json({ ok: true, message: 'User not found', users, error: null });
  }
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    getUserHandler(req, res);
  }
  if (req.method === 'GET') {
    getAllUsersHandler(req, res);
  }
}
