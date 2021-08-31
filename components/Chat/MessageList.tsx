import React, { useRef } from 'react';
import { useEffect } from 'react';
import { Message } from '../../AppTypes';
import styles from '../../styles/Chat.module.css';
import Loader from '../utilities/Loader';
import MessageContainer from './Message';
import { useScrolledToElemenet } from '../../utils/hooks';
interface Props {
  messages: Message[];
  name: string;
  isTyping: boolean;
  loading: boolean;
}

const MessageList = ({
  messages,
  name,
  isTyping,
  loading,
}: Props): JSX.Element => {
  const bottomElRef = useRef<null | HTMLDivElement>(null);
  const topElRef = useRef<null | HTMLDivElement>(null);
  const isVisible = useScrolledToElemenet(topElRef);

  useEffect(() => {
    bottomElRef.current?.scrollIntoView(false);
  }, [messages]);

  return (
    <div className={styles.MessageList}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div ref={topElRef}></div>
          {messages.map((m) => (
            <MessageContainer key={m.date + m.senderUid} message={m} />
          ))}

          <div ref={bottomElRef} style={{ marginTop: '10px' }}>
            {isTyping && `${name} is typing...`}
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(MessageList);
