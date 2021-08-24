import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState } from 'react';
import Button from '../UI/Button';

import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Chat.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { socket } from '../../utils/sockets';
import { Room } from '../../AppTypes';
import { updateRooms } from '../../store/reducers/chatSlice';
import React from 'react';

interface Props {
  room: Room;
}

const MessageInput = ({ room }: Props): JSX.Element => {
  const [text, setText] = useState('');
  const user = useAppSelector((state) => state.userState.user);
  const rooms = useAppSelector((state) => state.chatState.rooms);
  const dispatch = useAppDispatch();
  const messageTypeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const messageSendHandler = () => {
    if (text.trim() === '') return;
    const newRoom = { ...room };

    newRoom.messages = [
      ...room.messages,
      {
        message: text,
        date: Date.now().toString(),
        uid: user?.uid,
      },
    ];
    socket.emit('send-message', newRoom);
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
