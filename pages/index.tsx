import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';

const Index: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Chat It</title>
        <meta name="description" content="Chat It" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <div></div>
      </Layout>
    </div>
  );
};

export default Index;
