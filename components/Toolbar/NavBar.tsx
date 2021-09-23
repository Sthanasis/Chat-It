import Link from 'next/link';
import React from 'react';
import { useAppSelector } from '../../store/hooks';
import styles from '../../styles/Toolbar.module.css';
import ActiveLink from './ActiveLink';
import Profiler from './Profiler';

const NavBar = (): JSX.Element => {
  const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);

  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>Chat It</div>
      <div className={styles.routes}>
        <ul>
          <li>
            <ActiveLink activeClassName={styles.activeNeutral} href="/">
              <a>Home</a>
            </ActiveLink>
          </li>
          {isLoggedIn && (
            <>
              <li>
                <ActiveLink
                  activeClassName={styles.activeNeutral}
                  href="/profile"
                  shallow
                >
                  <a>Profile</a>
                </ActiveLink>
              </li>
              <li>
                <ActiveLink
                  activeClassName={styles.activeNeutral}
                  href={`/user`}
                  shallow
                >
                  <a>Connections</a>
                </ActiveLink>
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
