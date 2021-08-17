import { User } from '../../AppTypes';
import UserPhoto from '../UI/UserPhoto';
import styles from '../../styles/Userstyles.module.css';

interface Props {
  user: User;
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
    </div>
  );
};

export default Card;
