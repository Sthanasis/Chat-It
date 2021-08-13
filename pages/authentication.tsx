import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';
import { useState } from 'react';

const AuthenticationPage: NextPage = () => {
  const [toSignIn, setToSignIn] = useState(false);

  return (
    <div>
      <Head>
        <title>Chat It</title>
        <meta name="description" content="Chat It" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>{toSignIn ? <Login /> : <Signup />}</Layout>
    </div>
  );
};

export default AuthenticationPage;
