import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Toolbar/Toolbar.module.css';

const Profiler = (): JSX.Element => {
  return (
    <div className={styles.profiler}>
      <div className={styles.user}>
        <a href="#">John Doe</a>
      </div>
      <div className={styles.profilePhoto}>
        <FontAwesomeIcon icon={faUserAlt} size="2x" />
      </div>
    </div>
  );
};

export default Profiler;
