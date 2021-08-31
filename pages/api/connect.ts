import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

import { catchAsync, combineUserUids } from '../../utils/util';

export const config = {
  api: {
    externalResolver: true,
  },
};

const connectWithUser = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );
    const myUid: string = req.body.uid;
    const otherUid: string = req.body.uid2;

    const db = client.db();
    const userCollection = db.collection('users');
    const roomCollection = db.collection('chat-rooms');

    const updateFirst = userCollection.updateOne(
      { uid: myUid },
      { $addToSet: { connectedTo: otherUid } }
    );

    const updateSecond = userCollection.updateOne(
      { uid: otherUid },
      { $addToSet: { connectedTo: myUid } }
    );

    const createChatRoom = roomCollection.insertOne({
      roomId: combineUserUids(myUid, otherUid),
      chats: [],
    });
    const promises = Promise.all([updateFirst, updateSecond, createChatRoom]);

    const result = await promises;

    if (result) {
      res.json({
        ok: true,
        message: `You have connected with the user`,
        result: [updateFirst, updateSecond, createChatRoom],
      });
      res.status(201).end();
    } else {
      res.json({
        ok: false,
        message: `Connecting with the user failed.`,
      });
      res.status(400).end();
    }
    client.close();
  }
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    connectWithUser(req, res);
  }
}
