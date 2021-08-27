import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateRooms } from '../store/reducers/chatSlice';
import styles from '../styles/Layout.module.css';

import Chat from './Chat/Chat';

const Footer = (): JSX.Element => {
  const rooms = useAppSelector((state) => state.chatState.rooms);
  const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);

  const dispatch = useAppDispatch();

  const onCloseHandler = (roomId: string) => {
    const newRooms = rooms.filter((room) => room.id !== roomId);
    dispatch(updateRooms(newRooms));
  };

  return (
    <div className={styles.Footer}>
      {isLoggedIn &&
        rooms.map((room) => (
          <Chat
            key={`${room.id}-${Math.random()}`}
            room={room}
            onClose={() => onCloseHandler(room.id)}
          />
        ))}
    </div>
  );
};

export default React.memo(Footer);
