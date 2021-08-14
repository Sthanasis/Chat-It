import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Toolbar.module.css';
import { useAppSelector } from '../../store/hooks';
import Button from '../UI/Button';

const Profiler = (): JSX.Element => {
  const isAuth = useAppSelector((state) => state.userState.isLoggedIn);

  return (
    <div className={styles.profiler}>
      {isAuth ? (
        <>
          <div className={styles.user}>
            <a href="#">John Doe</a>
          </div>
          <div className={styles.profilePhoto}>
            <FontAwesomeIcon icon={faUserAlt} size="2x" />
          </div>{' '}
        </>
      ) : (
        <div>
          <Button type="transparent" onClick={() => {}}>
            <Link href="/user/sign-in/">Sign in</Link>
          </Button>
          <Button type="transparent" onClick={() => {}}>
            <Link href="/user/sign-up/">Sign up</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profiler;
