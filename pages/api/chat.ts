import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';
import { catchAsync } from '../../utils/util';
import { ChatRoomDbSchema } from '../../AppTypes';

export const config = {
  api: {
    externalResolver: true,
  },
};

const getChat = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );
    const roomId = req.query.roomId;
    const limit = req.query.limit.toString();
    const db = client.db();
    const roomCollection = db.collection('chat-rooms');
    const room = (await roomCollection.findOne({ roomId })) as ChatRoomDbSchema;
    console.log(room.chats.slice(parseInt(limit), parseInt(limit) + 10));
    if (room) {
      res.json({
        ok: true,
        result: room.chats
          .slice(parseInt(limit), parseInt(limit) + 10)
          .reverse(),
        error: null,
      });
      res.status(200);
    } else {
      res.json({
        ok: false,
        error: `Room with id ${roomId} not found`,
      });
      res.status(404);
    }
    client.close();
    res.end();
  }
);

const postChat = catchAsync(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await MongoClient.connect(
      'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
    );
    const { roomId, message } = req.body;
    const db = client.db();
    const roomCollection = db.collection('chat-rooms');
    const result = await roomCollection.updateOne(
      { roomId },
      {
        $push: {
          chats: {
            $each: [message],
            $position: 0,
          },
        },
      }
    );
    if (result) {
      res.json({
        ok: true,
        message: `Message has been added to room ${roomId}`,
        result: result,
      });
      res.status(201);
    } else {
      res.json({
        ok: false,
        message: `Failure on message send.`,
      });
      res.status(400);
    }
    client.close();
    res.end();
  }
);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    getChat(req, res);
  }
  if (req.method === 'POST') {
    postChat(req, res);
  }
}
