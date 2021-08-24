import React, { useState } from 'react';
import { useEffect } from 'react';
import { Room } from '../../AppTypes';
import styles from '../../styles/Chat.module.css';
import Loader from '../utilities/Loader';
import Message from './Message';

interface Props {
  room: Room;
}

const MessageList = ({ room }: Props): JSX.Element => {
  const messages = room.messages;
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
  return (
    <div className={styles.MessageList}>
      {loading ? (
        <Loader />
      ) : (
        messages.map((m) => <Message key={m.date + m.uid} message={m} />)
      )}
    </div>
  );
};

export default React.memo(MessageList);
