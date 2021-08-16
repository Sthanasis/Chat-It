import type { NextPage } from 'next';
import Landing from '../components/Landing';
import { useAppSelector } from '../store/hooks';
import { socket } from '../utils/sockets';
const HomePage: NextPage = () => {
  // const socket = useAppSelector((state) => state.socketState.socket.open());
  return <Landing socket={socket} />;
};

export default HomePage;
