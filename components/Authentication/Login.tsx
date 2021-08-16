import React, { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import styles from '../../styles/Form.module.css';
import Link from 'next/link';
import { authenticate } from '../../utils/api';
import { setIsLoggedIn, setToken } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../store/hooks';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const loginUser = async () => {
    try {
      const res = await authenticate({ username: email, password });
      if (res.data.ok) {
        const token: string = res.data.result.token;
        dispatch(setIsLoggedIn(true));
        dispatch(setToken(token));
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
