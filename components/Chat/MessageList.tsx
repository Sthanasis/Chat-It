import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Message } from '../../AppTypes';
import styles from '../../styles/Chat.module.css';
import Loader from '../utilities/Loader';
import MessageContainer from './Message';

interface Props {
  messages: Message[];
}

const MessageList = ({ messages }: Props): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const bottomElRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomElRef.current?.scrollIntoView(false);
  });

  return (
    <div className={styles.MessageList}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {messages.map((m) => (
            <MessageContainer key={m.date + m.senderUid} message={m} />
          ))}
          <div ref={bottomElRef} style={{ marginTop: '10px' }}></div>
        </>
      )}
    </div>
  );
};

export default React.memo(MessageList);
