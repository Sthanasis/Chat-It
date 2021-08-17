import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

import { catchAsync } from '../../utils/util';

const connectWithUser = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );
    const myUid: string = req.body.uid;
    const otherUid: string = req.body.uid2;

    const db = client.db();
    const userCollection = db.collection('users');

    const updateFirst = userCollection.updateOne(
      { uid: myUid },
      { $addToSet: { connectedTo: otherUid } }
    );

    const updateSecond = userCollection.updateOne(
      { uid: otherUid },
      { $addToSet: { connectedTo: myUid } }
    );
    const promises = Promise.all([updateFirst, updateSecond]);
    console.log(promises);
    const result = await promises;
    console.log(result);
    if (result) {
      res.json({
        ok: true,
        message: `You have connected with the user`,
        result: [updateFirst, updateSecond],
      });
      res.status(201);
    } else {
      res.json({
        ok: false,
        message: `Connecting with the user failed.`,
      });
      res.status(400);
    }
    client.close();
  }
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    connectWithUser(req, res);
  }
}
