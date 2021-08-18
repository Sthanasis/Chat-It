import Navbar from './Toolbar/NavBar';
import Footer from './Footer';
import { ReactNode, useEffect } from 'react';
import styles from '../styles/Layout.module.css';
import { socket } from '../utils/sockets';
import { UserDBSchema, UserStatus } from '../AppTypes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setConnections } from '../store/reducers/userSlice';

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  const connections = useAppSelector((state) => state.userState.connections);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on('message', (data: UserStatus) => {
      const index = connections.findIndex((c) => c.uid === data.uid);
      const updatedConnections = [...connections];
      updatedConnections[index] = {
        ...connections[index],
        active: data.active,
      };
      dispatch(setConnections(updatedConnections));
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
