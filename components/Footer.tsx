import React from 'react';
import { useAppSelector } from '../store/hooks';
import styles from '../styles/Layout.module.css';
import Chat from './Chat/Chat';

const Footer = (): JSX.Element => {
  const rooms = useAppSelector((state) => state.chatState.rooms);
  return (
    <div className={styles.Footer}>
      {rooms.map((room) => (
        <Chat key={`${room.id}-${Math.random()}`} room={room} />
      ))}
    </div>
  );
};

export default React.memo(Footer);
