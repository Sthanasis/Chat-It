import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Landing from '../components/Landing';
import { useAppSelector } from '../store/hooks';

const HomePage: NextPage = () => {
  const socket = useAppSelector((state) => state.socketState.socket);

  return <Landing socket={socket} />;
};

export default HomePage;
