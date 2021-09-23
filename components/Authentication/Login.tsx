import React, { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import styles from '../../styles/Form.module.css';
import Link from 'next/link';
import {
  authenticate,
  getConnections,
  updateUserStatus,
} from '../../utils/api';
import {
  setConnections,
  setIsAuth,
  setToken,
  setUser,
} from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../store/hooks';
import { socket } from '../../utils/sockets';
import { User } from '../../AppTypes';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const loginUser = async () => {
    try {
      const res = await authenticate({ email, password });
      if (res.data.ok) {
        const token: string = res.data.result.token;
        const user: User = res.data.result.user;

        dispatch(setIsAuth(true));
        dispatch(setToken(token));
        dispatch(setUser(user));

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
        try {
          const setActiveStatus = await updateUserStatus(user.uid, true);
          getConnections(user.connectedTo)
            .then((res) => {
              dispatch(setConnections(res.data.users));
              localStorage.setItem(
                'connections',
                JSON.stringify(res.data.users)
              );
              socket.connect();
              socket.emit('active', { ...user });
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          console.log({ err });
        }
      }
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={styles.LoginForm}>
        <Input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />
      </div>

      <div className={styles.FormButtons}>
        <Button onClick={loginUser} type="submit">
          Submit
        </Button>
        <Button type="transparent" onClick={() => {}} style={{}}>
          <Link href="/user/sign-up">Not registered? Sign Up.</Link>
        </Button>
      </div>
    </form>
  );
};

export default Login;
