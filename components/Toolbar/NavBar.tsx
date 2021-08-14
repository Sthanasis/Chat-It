import Link from 'next/link';
import styles from '../../styles/Toolbar.module.css';
import Profiler from './Profiler';

const NavBar = (): JSX.Element => {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>Chat It</div>
      <div className={styles.routes}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/user">Profile</Link>
          </li>
        </ul>
      </div>
      <Profiler />
    </div>
  );
};
export default NavBar;
