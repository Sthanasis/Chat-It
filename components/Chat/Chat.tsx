import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { to_Decrypt, to_Encrypt } from '../../aes';

import Title from './Title';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { SocketType } from '../../store/store';

interface Props {
  socket: SocketType;
  room: string;
}

const Chat = ({ socket, room }: Props): JSX.Element => {
  return (
    <div>
      <Title>
        <span>{room}</span>
      </Title>
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default Chat;
