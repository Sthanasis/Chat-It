import { to_Decrypt, to_Encrypt } from '../../aes';

import Title from './Title';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { socket } from '../../utils/sockets';
import styles from '../../styles/Chat.module.css';
import { Message, Room } from '../../AppTypes';
import { useState, useEffect } from 'react';

interface Props {
  room: Room;
}

const Chat = ({ room }: Props): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('chat', (data: Message) => {
      setMessages([...messages, data]);
      console.log(room);
    });
    return () => {
      socket.off('chat');
    };
  }, [messages]);

  return (
    <div className={styles.Chat}>
      <Title>
        <span>{room.name}</span>
      </Title>
      <MessageList messages={messages} />
      <MessageInput room={room} />
    </div>
  );
};

export default Chat;
