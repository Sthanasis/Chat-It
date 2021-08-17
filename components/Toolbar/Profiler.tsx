import Image from 'next/image';
import Link from 'next/link';
import UserPhoto from '../UI/UserPhoto';
import styles from '../../styles/Toolbar.module.css';
import { useAppSelector } from '../../store/hooks';
import Button from '../UI/Button';

const Profiler = (): JSX.Element => {
  const isAuth = useAppSelector((state) => state.userState.isLoggedIn);
  const user = useAppSelector((state) => state.userState.user);

  return (
    <div className={styles.profiler}>
      {isAuth && user ? (
        <UserPhoto user={user} />
      ) : (
        <div>
          <Button type="transparent" onClick={() => {}}>
            <Link href="/user/sign-in/">Sign in</Link>
          </Button>
          {/* <Button type="transparent" onClick={() => {}}>
            <Link href="/user/sign-up/">Sign up</Link>
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default Profiler;
