import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { to_Decrypt, to_Encrypt } from '../../aes';

import Title from './Title';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { SocketType } from '../../utils/sockets';
import styles from '../../styles/Chat.module.css';
import { Room, User } from '../../AppTypes';

interface Props {
  room: Room;
}

const Chat = ({ room }: Props): JSX.Element => {
  return (
    <div className={styles.Chat}>
      <Title>
        <span>{room.name}</span>
      </Title>
      <MessageList room={room} />
      <MessageInput room={room} />
    </div>
  );
};

export default Chat;
