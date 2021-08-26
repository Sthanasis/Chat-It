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
}

const MessageInput = ({ room }: Props): JSX.Element => {
  const [text, setText] = useState('');

  const messageTypeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const messageSendHandler = () => {
    if (text.trim() === '') return;
    const message: Message = {
      message: text,
      date: Date.now().toString(),
      receiverUid: room.receiverUid,
      senderUid: room.senderUid,
      senderName: room.senderName,
      receiverName: room.receiverName,
    };
    if (socket.disconnected) {
      socket.connect();
    }
    socket.emit('start chat', room);
    socket.emit('send-message', message);
    // dispatch(
    //   updateRooms(rooms.map((r, i) => (i === newRoom.index ? newRoom : r)))
    // );
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
