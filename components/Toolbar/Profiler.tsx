import Image from 'next/image';
import Link from 'next/link';
import UserPhoto from '../UI/UserPhoto';
import styles from '../../styles/Toolbar.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Button from '../UI/Button';
import { signOutUser, updateUserStatus } from '../../utils/api';
import {
  setConnections,
  setIsAuth,
  setToken,
  setUser,
} from '../../store/reducers/userSlice';
import { socket } from '../../utils/sockets';
import { useState } from 'react';
import { Fade, Grow } from '@material-ui/core';

const Profiler = (): JSX.Element => {
  const isAuth = useAppSelector((state) => state.userState.isLoggedIn);
  const user = useAppSelector((state) => state.userState.user);

  const dispatch = useAppDispatch();

  const signOut = async () => {
    if (user && isAuth) {
      const res = await updateUserStatus(user.uid, false);

      if (res.data.ok) {
        socket.emit('inactive', user.uid);
        socket.disconnect();
        dispatch(setUser(null));
        dispatch(setIsAuth(false));
        dispatch(setToken(null));
        dispatch(setConnections([]));
        signOutUser();
      }
    }
  };
  return (
    <div className={styles.profiler}>
      {isAuth && user ? (
        <>
          <UserPhoto user={user} />
          <Button onClick={signOut} type="remove">
            Sign out
          </Button>
        </>
      ) : (
        <div>
          <Button type="transparent" onClick={() => {}}>
            <Link href="/user/sign-in/">Sign in</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profiler;
