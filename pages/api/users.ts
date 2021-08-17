import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

import { catchAsync } from '../../utils/util';
import { User } from '../../AppTypes';

const getUserHandler = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader(
      'Cache-control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );
    const uid: string = req.body.uid;
    const db = client.db();
    const userCollection = db.collection('users');
    const result = await userCollection.findOne({ uid });
    client.close();
    if (result) {
      res.json({ ok: true, message: 'User found', result, error: null });
      res.status(200).end();
    } else {
      res.json({ ok: true, message: 'User not found', error: null });
      res.status(200).end();
    }
  }
);

const updateUserStatus = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader(
      'Cache-control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );
    const { uid, active } = req.body;
    const db = client.db();
    const userCollection = db.collection('users');
    const result = await userCollection.findOneAndUpdate(
      { uid },
      { $set: { active } }
    );
    client.close();
    if (result.ok) {
      res.json({ ok: true });
      res.status(200).end();
    } else {
      res.json({ ok: false });
      res.status(200).end();
    }
  }
);

const getAllActiveUsers = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader(
      'Cache-control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );
    const db = client.db();
    const userCollection = db.collection('users');
    const result: User[] = await userCollection
      .find({ active: true }, { projection: { password: 0, _id: 0 } })
      .toArray();
    client.close();
    res.json({ users: result });
    res.status(200).end();
  }
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    getUserHandler(req, res);
  }
  if (req.method === 'GET') {
    getAllActiveUsers(req, res);
  }
  if (req.method === 'PATCH') {
    updateUserStatus(req, res);
  }
}
