import React, { ReactEventHandler, useEffect, useState } from 'react';
import { setRooms } from '../store/reducers/chatSlice';
import { SocketType } from '../utils/sockets';
import Chat from './Chat/Chat';
import { useAppSelector } from '../store/hooks';
import { getUser } from '../utils/api';
interface Props {
  socket: SocketType;
}

const Landing = ({ socket }: Props): JSX.Element => {
  useEffect(() => {
    socket.emit('joinRoom');
  }, []);

  const get = async () => {
    const res = await getUser('test@test.com');
    console.log(res);
  };

  return (
    <>
      <button onClick={get}>Join Room</button>
    </>
  );
};

export default Landing;
