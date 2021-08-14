import { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { createUser } from '../../utils/api';
import { generateUniqueUid, isEmail } from '../../utils/util';
import { User } from '../../AppTypes';
import styles from '../../styles/Form.module.css';
import Link from 'next/link';

const Signup = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState(new Date().toISOString().split('T')[0]);
  const [gender, setGender] = useState('Female');

  const validateUserInput = () => {
    if (password.trim() !== verifyPassword.trim()) {
      return false;
    }
    if (username.trim() === '') {
      return false;
    }
    if (firstname.trim() === '') {
      return false;
    }
    if (lastname.trim() === '') {
      return false;
    }
    if (age.trim() === '') {
      return false;
    }
    if (email.trim() === '') {
      return false;
    } else {
      if (!isEmail(email)) {
        return false;
      }
    }
    return true;
  };
  const submitHandler = async () => {
    const uid = generateUniqueUid();
    const validData = validateUserInput();
    if (!validData) {
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
    try {
      const res = await createUser(user);
      console.log(res);
    } catch (err) {
      console.log(err.err.response.data);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <h4>Set Up Your Account</h4>
      <div className={styles.RegisterForm}>
        <Input
          type="text"
          label="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          type="text"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          label="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          label="Verify password"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />
      </div>
      <h4>Personal Information</h4>
      <div className={styles.RegisterForm}>
        <Input
          type="text"
          label="First name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
          type="text"
          label="Last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />

        <Input
          type="select"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          onClick={(v) => setGender(v)}
          label="Gender"
          options={['Male', 'Female', 'Other']}
        />

        <Input
          type="date"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          label="Date of birth"
        />
      </div>
      <div className={styles.FormButtons}>
        <Button type="submit" onClick={submitHandler}>
          Submit
        </Button>
        <Button type="transparent" onClick={() => {}} style={{}}>
          <Link href="/user/sign-in"> Already Registered? Sign In.</Link>
        </Button>
      </div>
    </form>
  );
};

export default Signup;
