import { Message } from '../../AppTypes';

interface Props {
  message: Message;
}

const MessageContainer = ({ message }: Props): JSX.Element => {
  return <div>{message.message}</div>;
};

export default MessageContainer;
