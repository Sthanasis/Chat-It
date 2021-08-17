import { MongoClient } from 'mongodb';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { User } from '../../AppTypes';
import UsersList from '../../components/User/UsersList';
import { useAppSelector } from '../../store/hooks';
import { socket } from '../../utils/sockets';

const UsersPage: NextPage = ({
  users,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);
  const friends = useAppSelector((state) => state.userState.friends);
  return isLoggedIn ? (
    <UsersList socket={socket} users={users} />
  ) : (
    <div>Login to See the users</div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const client = await MongoClient.connect(
    'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
  );

  const db = client.db();
  const userCollection = db.collection('users');
  const result: User[] = await userCollection
    .find({}, { projection: { password: 0, _id: 0 } })
    .toArray();
  client.close();
  if (!result) {
    return {
      props: {
        users: [],
      },
    };
  } else {
    return {
      props: {
        users: result,
      },
    };
  }
};

export default UsersPage;
