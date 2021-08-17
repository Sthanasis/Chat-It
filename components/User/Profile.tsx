import { User } from '../../AppTypes';
import { useAppSelector } from '../../store/hooks';
import { connectToUser } from '../../utils/api';
import Button from '../UI/Button';

interface Props {
  user: User;
}

const Profile = ({ user }: Props): JSX.Element => {
  const currentUser = useAppSelector((state) => state.userState.user);

  const connectWithUser = async () => {
    const res = await connectToUser(currentUser?.uid, user.uid);
    console.log(res);
  };
  return (
    <div id={user.uid}>
      <div>
        {user.firstname} {user.lastname}
      </div>
      <div>{user.age}</div>
      <div>{user.gender}</div>
      <div>{user.email}</div>
      {currentUser?.uid !== user.uid && (
        <div>
          {currentUser && user.connectedTo.includes(currentUser.uid) ? (
            <Button type="remove" onClick={() => {}}>
              Disconnect from {user.firstname}
            </Button>
          ) : (
            <Button type="add" onClick={connectWithUser}>
              Connect with {user.firstname}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
