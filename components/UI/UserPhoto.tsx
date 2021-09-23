import styles from '../../styles/Userstyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../AppTypes';

interface Props {
  user: User;
}

const UserPhoto = ({ user }: Props): JSX.Element => {
  return (
    <>
      <div className={styles.profilePhoto}>
        <FontAwesomeIcon icon={faUserAlt} size="2x" />
      </div>
      <div className={styles.user}>
        <span>{user.username}</span>
      </div>
    </>
  );
};

export default UserPhoto;
