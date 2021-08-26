import Navbar from './Toolbar/NavBar';
import Footer from './Footer';
import React, { ReactNode, useEffect } from 'react';
import styles from '../styles/Layout.module.css';
import { socket } from '../utils/sockets';
import { Message, Room, UserStatus } from '../AppTypes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setConnections } from '../store/reducers/userSlice';

import {
  setActiveChats,
  setRooms,
  updateRooms,
} from '../store/reducers/chatSlice';
import { combineUserUids } from '../utils/util';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  const connections = useAppSelector((state) => state.userState.connections);
  const isAuth = useAppSelector((state) => state.userState.isLoggedIn);
  const rooms = useAppSelector((state) => state.chatState.rooms);
  const dispatch = useAppDispatch();

  const setUserConnectionsStatus = (data: UserStatus) => {
    const updatedConnections = connections.map((c) => {
      return c.uid === data.uid ? { ...c, active: data.active } : c;
    });
    dispatch(setConnections(updatedConnections));
    localStorage.setItem('connections', JSON.stringify(updatedConnections));
  };

  useEffect(() => {
    socket.on('startChat', (room: Room) => {
      //if chatRoom close, open it for the receiver.
      if (
        !rooms.some(
          (room) =>
            room.id === combineUserUids(room.receiverUid, room.senderUid)
        )
      ) {
        //reverse the chatRoom name so that it displays the name of the receiver
        const newRoom = {
          ...room,
          name: room.receiverName,
          receiverName: room.senderName,
          senderName: room.senderName,
          index: rooms.length,
          receiverUid: room.receiverUid,
          senderUid: room.senderUid,
        };
        dispatch(setRooms(newRoom));
      }
    });
    return () => {
      socket.off('startChat');
    };
  }, [rooms]);

  useEffect(() => {
    if (isAuth) {
      if (socket.disconnected) {
        socket.connect();
        socket.emit(
          'reconnect',
          JSON.parse(localStorage.getItem('user') || '{}')
        );
      }
    }
    socket.on('userSignIn', (data: UserStatus) => {
      setUserConnectionsStatus(data);
    });

    socket.on('userSignOut', (data: UserStatus) => {
      setUserConnectionsStatus(data);
    });

    return () => {
      socket.off('userSignIn');
      socket.off('userSignOut');
    };
  }, [socket]);

  return (
    <div className={styles.Layout}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default React.memo(Layout);
