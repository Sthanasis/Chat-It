import styles from '../../styles/Toolbar.module.css';
import Profiler from './Profiler';

const NavBar = (): JSX.Element => {
  return (
    <div className={styles.navBar}>
      <div className={styles.logo}>Chat It</div>
      <Profiler />
    </div>
  );
};
export default NavBar;
