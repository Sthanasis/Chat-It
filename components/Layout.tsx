import Navbar from './Toolbar/NavBar';
import Footer from './Footer';
import { ReactNode, useEffect } from 'react';
import styles from '../styles/Layout.module.css';
import { socket } from '../utils/sockets';
import { Room, UserStatus } from '../AppTypes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setConnections } from '../store/reducers/userSlice';

import { setRooms, updateRooms } from '../store/reducers/chatSlice';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  const connections = useAppSelector((state) => state.userState.connections);
  const rooms = useAppSelector((state) => state.chatState.rooms);
  const isAuth = useAppSelector((state) => state.userState.isLoggedIn);

  const dispatch = useAppDispatch();

  const setUserConnectionsStatus = (data: UserStatus) => {
    const updatedConnections = connections.map((c) => {
      return c.uid === data.uid ? { ...c, active: data.active } : c;
    });
    dispatch(setConnections(updatedConnections));
    localStorage.setItem('connections', JSON.stringify(updatedConnections));
  };

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

    socket.on('startChat', (data: any) => {
      console.log(data);
    });

    socket.on('chat', (data: Room) => {
      if (rooms.every((room) => room.id !== data.id)) {
        console.log(rooms, data);
        const sender = connections.find((user) => user.uid === data.senderUid);
        if (sender)
          dispatch(
            setRooms({
              ...data,
              name: sender.firstname,
              senderUid: data.receiverUid,
              receiverUid: data.senderUid,
            })
          );
      } else {
        dispatch(
          updateRooms(rooms.map((r, i) => (i === data.index ? data : r)))
        );
      }
    });
  }, [socket]);

  return (
    <div className={styles.Layout}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
