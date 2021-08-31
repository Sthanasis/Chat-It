import Title from './Title';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { socket } from '../../utils/sockets';
import styles from '../../styles/Chat.module.css';
import { Message, Room } from '../../AppTypes';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { getChat } from '../../utils/api';
import { combineUserUids } from '../../utils/util';
import Loader from '../utilities/Loader';

interface Props {
  room: Room;
  onClose: () => void;
}

const Chat = ({ room, onClose }: Props): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [limit, setLimit] = useState(0);

  const userId = useAppSelector((state) => state.userState.user?.uid) || '';
  const receiverId =
    room.receiverUid === userId ? room.senderUid : room.receiverUid;

  useEffect(() => {
    socket.on('chat', (data: Message) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.off('chat');
    };
  }, [messages]);

  useEffect(() => {
    socket.on('typing', (typing: boolean) => {
      setIsTyping(typing);
    });
    return () => {
      socket.off('typing');
    };
  }, [isTyping]);

  useEffect(() => {
    getChatRoomMessages();
  }, [limit]);

  const getChatRoomMessages = async () => {
    try {
      const res = await getChat(combineUserUids(userId, receiverId), limit);
      if (res?.data.ok) {
        setLoading(false);
        setMessages(res?.data.result);
      }
    } catch (err) {
      console.log({ err });
    }
  };

  const onHideChatHandler = (show: boolean) => {
    setShowChat(show);
  };

  return (
    <div className={styles.Chat}>
      <Title onHideChat={() => onHideChatHandler(!showChat)} onClose={onClose}>
        <span>{room.name}</span>
      </Title>
      {showChat && (
        <>
          <MessageList
            messages={messages}
            isTyping={isTyping}
            name={room.name}
            loading={loading}
          />
          <MessageInput room={room} receiverId={receiverId} userId={userId} />
        </>
      )}
    </div>
  );
};

export default Chat;
