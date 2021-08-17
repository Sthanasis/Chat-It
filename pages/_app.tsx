import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/store';
import Layout from '../components/Layout';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { socket } from '../utils/sockets';
import { UserStatus } from '../AppTypes';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  useEffect(() => {
    socket.on('message', (data: UserStatus) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <Provider store={store}>
      <Layout>
        {loading ? <div>Loading...</div> : <Component {...pageProps} />}
      </Layout>
    </Provider>
  );
}

export default MyApp;
