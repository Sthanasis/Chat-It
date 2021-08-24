import { Room, User } from '../../AppTypes';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setRooms } from '../../store/reducers/chatSlice';
import { connectToUser } from '../../utils/api';
import { socket } from '../../utils/sockets';
import { combineUserUids } from '../../utils/util';
import Button from '../UI/Button';

interface Props {
  user: User;
}

const Profile = ({ user }: Props): JSX.Element => {
  const currentUser = useAppSelector((state) => state.userState.user);
  const rooms = useAppSelector((state) => state.chatState.rooms);

  const dispatch = useAppDispatch();
  const startChat = () => {
    if (currentUser) {
      const room: Room = {
        id: combineUserUids(user.uid, currentUser.uid),
        name: user.firstname,
        senderUid: currentUser.uid,
        receiverUid: user.uid,
        collapsed: false,
        messages: [],
        index: rooms.length === 0 ? 0 : rooms.length,
      };
      if (rooms.some((r) => room.id === r.id)) return;
      dispatch(setRooms(room));
      if (socket.connected) {
        socket.emit('start chat', room);
      } else {
        socket.connect();
        socket.emit(
          'reconnect',
          JSON.parse(localStorage.getItem('user') || '{}')
        );
        socket.emit('start chat', room);
      }
    }
  };

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
        <>
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
          <div>
            <Button onClick={startChat} type="primary">
              Chat with {user.firstname}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
