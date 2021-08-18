import Link from 'next/link';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import styles from '../../styles/Toolbar.module.css';
import Profiler from './Profiler';

const NavBar = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);
  const userId = useAppSelector((state) => state.userState.user?.uid);
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>Chat It</div>
      <div className={styles.routes}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <Link href="/profile" shallow>
                  Profile
                </Link>
              </li>
              <li>
                <Link href={`/user`} shallow>
                  Connections
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <Profiler />
    </div>
  );
};
export default React.memo(NavBar);
