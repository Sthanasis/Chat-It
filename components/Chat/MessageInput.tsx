import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import Button from '../UI/Button';

import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Chat.module.css';

import { socket } from '../../utils/sockets';
import { Message, Room } from '../../AppTypes';

import React from 'react';
import { postChat } from '../../utils/api';

interface Props {
  room: Room;
  receiverId: string;
  userId: string;
  onAddNewMessage: (msg: Message) => void;
}

const MessageInput = ({
  room,
  receiverId,
  userId,
  onAddNewMessage,
}: Props): JSX.Element => {
  const [text, setText] = useState('');

  const messageTypeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    socket.emit('isTyping', { uid: receiverId, isTyping: true });
    setText(e.target.value);
  };

  const messageSendHandler = async () => {
    if (text.trim() === '') return;
    const message: Message = {
      message: text,
      date: new Date(),
      receiverUid: receiverId,
      senderUid: userId,
      senderName:
        room.receiverUid === receiverId ? room.senderName : room.receiverName,
      receiverName:
        room.receiverUid === receiverId ? room.receiverName : room.senderName,
    };
    setText('');
    onAddNewMessage(message);
    try {
      const postAction = await postChat(room.id, message);
      if (postAction?.data.ok) {
        if (socket.disconnected) {
          socket.connect();
        }
        socket.emit('start chat', { room, receiverId });
        socket.emit('send-message', message);
      } else {
        //TODO inform user
        console.log(postAction?.data.message);
      }
    } catch (err) {
      //TODO error handling

      console.log({ err });
    }
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
        onBlur={() =>
          socket.emit('isTyping', { uid: receiverId, isTyping: false })
        }
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
