import React, { ReactEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hooks';
import { setRooms } from '../store/reducers/chatSlice';
import { SocketType } from '../store/store';
import Chat from './Chat/Chat';

interface Props {
  socket: SocketType;
}

const Landing = ({ socket }: Props): JSX.Element => {
  const [username, setUsername] = useState('');
  const [roomname, setRoomname] = useState('');

  const rooms = useAppSelector((state) => state.chat.rooms);

  const dispatch = useDispatch();
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleRoomname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomname(e.target.value);
  };
  const onJoinRoom = () => {
    if (username.trim() !== '' && roomname.trim() !== '') {
      socket.emit('joinRoom', { username, roomname });
      dispatch(setRooms(roomname));
    } else {
      alert('username and roomname are must !');
    }
  };
  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter room name"
          value={roomname}
          onChange={handleRoomname}
        />
        <input
          type="text"
          placeholder="Enter user name"
          value={username}
          onChange={handleUsername}
        />
        <button onClick={onJoinRoom}>Join Room</button>
      </div>
      <div>
        {rooms.map((room) => (
          <Chat socket={socket} room={room} key={room} />
        ))}
      </div>
    </>
  );
};

export default Landing;
