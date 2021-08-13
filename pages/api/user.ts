import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { User } from '../../AppTypes';
const createUserHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body) {
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
        .json({ ok: false, message: 'User exists', result, error: 'null' });
      return;
    }

    result = await userCollection.insertOne(user);

    client.close();
    res
      .status(201)
      .json({ ok: true, message: 'User inserted', result, error: null });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    createUserHandler(req, res);
  }
}
