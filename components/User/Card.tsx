import { User, UserDBSchema } from '../../AppTypes';
import UserPhoto from '../UI/UserPhoto';
import styles from '../../styles/Userstyles.module.css';

interface Props {
  user: UserDBSchema;
  onClick: (id: string) => void;
}

const Card = ({ user, onClick }: Props): JSX.Element => {
  return (
    <div
      className={styles.Card}
      id={user.uid}
      onClick={() => onClick(user.uid)}
    >
      <UserPhoto user={user} />
      <div>Status:{user.active ? ' Active' : ' Inactive'}</div>
    </div>
  );
};

export default Card;
