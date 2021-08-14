import { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import styles from '../../styles/Form.module.css';

interface Props {
  toSignUp: () => void;
}

const Login = ({ toSignUp }: Props): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        <Button onClick={() => {}} type="submit">
          Submit
        </Button>
        <Button type="transparent" onClick={toSignUp} style={{}}>
          Not registered? Sign Up.
        </Button>
      </div>
    </form>
  );
};

export default Login;
