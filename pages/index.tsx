import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Landing from '../components/Landing';
import { socket } from '../store/store';

const Index: NextPage = () => {
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

export default Index;
