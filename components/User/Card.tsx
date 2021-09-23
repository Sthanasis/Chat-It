import { UserDBSchema } from '../../AppTypes';
import styles from '../../styles/Userstyles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserAlt,
  faBirthdayCake,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { getBirthday } from '../../utils/util';
import Button from '../UI/Button';

interface Props {
  user: UserDBSchema;
  viewProfile: (id: string) => void;
}

const Card = ({ user, viewProfile }: Props): JSX.Element => {
  let genderCard: string;

  if (user.gender === 'Male') {
    genderCard = styles.maleActive;
  } else if (user.gender === 'Female') {
    genderCard = styles.femaleActive;
  } else {
    genderCard = styles.neutralActive;
  }

  return (
    <div className={styles.Card} id={user.uid}>
      <div className={styles.profile}>
        <div className={styles.profilePhoto}>
          <div className={user.active ? genderCard : styles.inactive}>
            <FontAwesomeIcon icon={faUserAlt} size="2x" />
          </div>
        </div>
        <div className={styles.user}>
          <span>{user.username}</span>
        </div>
      </div>
      <div className={styles.details}>
        <h4>About Me</h4>
        <div>
          <div>
            <span>
              <FontAwesomeIcon icon={faUserFriends} />
            </span>
            <span>{user.connectedTo.length}</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faBirthdayCake} />
            </span>
            <span>{getBirthday(user.age)}</span>
          </div>
        </div>
      </div>
      <div className={styles.Buttons}>
        <Button type={user.gender} onClick={() => viewProfile(user.uid)}>
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default Card;
