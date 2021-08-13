import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Landing from '../components/Landing';
import { useAppSelector } from '../store/hooks';

const HomePage: NextPage = () => {
  const socket = useAppSelector((state) => state.socketState.socket);

  return (
    <div>
      <Head>
        <title>Chat It</title>
        <meta name="description" content="Chat It" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Landing socket={socket} />
      </Layout>
    </div>
  );
};

export default HomePage;
