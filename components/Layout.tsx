import Navbar from './Toolbar/NavBar';
import Footer from './Footer';
import { ReactNode, useEffect } from 'react';
import styles from '../styles/Layout.module.css';
import { socket } from '../utils/sockets';
import { UserDBSchema, UserStatus } from '../AppTypes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setConnections } from '../store/reducers/userSlice';
import { hasLocalStorage } from '../utils/util';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  const connections = useAppSelector((state) => state.userState.connections);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on('message', (data: UserStatus) => {
      const updatedConnections = connections.map((c) => {
        return c.uid === data.uid ? { ...c, active: data.active } : c;
      });
      console.log(data);
      console.log(connections);
      dispatch(setConnections(updatedConnections));
      localStorage.setItem('connections', JSON.stringify(updatedConnections));
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
