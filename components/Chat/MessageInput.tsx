import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import Button from '../UI/Button';

import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Chat.module.css';

import { socket } from '../../utils/sockets';
import { Message, Room } from '../../AppTypes';

import React from 'react';

interface Props {
  room: Room;
  receiverId: string;
  userId: string;
}

const MessageInput = ({ room, receiverId, userId }: Props): JSX.Element => {
  const [text, setText] = useState('');

  const messageTypeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const messageSendHandler = () => {
    if (text.trim() === '') return;
    const message: Message = {
      message: text,
      date: new Date(),
      receiverUid:
        room.receiverUid === receiverId ? room.receiverUid : room.senderUid,
      senderUid:
        room.receiverUid === receiverId ? room.senderUid : room.receiverUid,
      senderName:
        room.receiverUid === receiverId ? room.senderName : room.receiverName,
      receiverName:
        room.receiverUid === receiverId ? room.receiverName : room.senderName,
    };
    if (socket.disconnected) {
      socket.connect();
    }
    console.log(message);
    socket.emit('start chat', room);
    socket.emit('send-message', message);
    setText('');
  };

  return (
    <form
      method="POST"
      className={styles.MessageInput}
      onSubmit={(e) => e.preventDefault()}
    >
      <textarea
        value={text}
        wrap="hard"
        onBlur={() => {}}
        onChange={messageTypeHandler}
        className={styles.TextArea}
      />

      <Button type="transparent" onClick={messageSendHandler}>
        <FontAwesomeIcon icon={faCaretRight} size="2x" />
      </Button>
    </form>
  );
};

export default React.memo(MessageInput);
