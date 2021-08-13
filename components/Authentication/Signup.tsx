import { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { createUser } from '../../utils/api';
import { generateUniqueUid, isEmail } from '../../utils/util';
import { User } from '../../AppTypes';

const Login = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState<Date | null>(null);
  const [gender, setGender] = useState('Female');

  const submitHandler = () => {
    const uid = generateUniqueUid();
    if (password.trim() === verifyPassword.trim()) {
      return;
    }
    if (username.trim() === '') {
      return;
    }
    if (firstname.trim() === '') {
      return;
    }
    if (lastname.trim() === '') {
      return;
    }
    if (!age) {
      return;
    }
    if (email.trim() === '' || !isEmail(email)) {
      return;
    }
    const user: User = {
      username,
      password,
      firstname,
      lastname,
      gender,
      age,
      uid,
      email,
    };
    console.log(user);
    return;
    createUser(user);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Input
        type="text"
        label="username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      <Input
        type="password"
        label="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Input
        type="password"
        label="Verify password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <Button type="submit" onClick={submitHandler}>
        Submit
      </Button>
    </form>
  );
};

export default Login;
