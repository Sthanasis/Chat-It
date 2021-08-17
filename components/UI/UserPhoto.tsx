import styles from '../../styles/Toolbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../AppTypes';

interface Props {
  user: User;
}

const UserPhoto = ({ user }: Props): JSX.Element => {
  return (
    <>
      <div className={styles.user}>
        <span>{user.username}</span>
      </div>
      <div className={styles.profilePhoto}>
        <FontAwesomeIcon icon={faUserAlt} size="2x" />
      </div>
    </>
  );
};

export default UserPhoto;
