import { MongoClient } from 'mongodb';
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';
import { useState } from 'react';
import { User, UserDBSchema } from '../../AppTypes';
import UsersList from '../../components/User/UsersList';
import Loader from '../../components/utilities/Loader';
import { useAppSelector } from '../../store/hooks';
import { setConnections } from '../../store/reducers/userSlice';
import { getAllUsers } from '../../utils/api';
import { socket } from '../../utils/sockets';

const UsersPage: NextPage = () =>
  //   {
  //   users,
  // }: InferGetStaticPropsType<typeof getStaticProps>
  {
    const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);
    const connectedTo = useAppSelector(
      (state) => state.userState.user?.connectedTo
    );
    const connections = useAppSelector((state) => state.userState.connections);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!localStorage.getItem('connections')) {
        if (connectedTo)
          getAllUsers(connectedTo)
            .then((res) => {
              setLoading(false);
              setConnections(res.data.users);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
      } else {
        setLoading(false);
      }
    }, []);

    return isLoggedIn ? (
      loading ? (
        <Loader />
      ) : (
        <UsersList socket={socket} users={connections} />
      )
    ) : (
      <div>Login to See the users</div>
    );
  };

// export const getStaticProps: GetStaticProps = async (context) => {
//   const client = await MongoClient.connect(
//     'mongodb+srv://sakis:10921092@yad.tbrsb.mongodb.net/chatIt?retryWrites=true&w=majority'
//   );

//   const db = client.db();
//   const userCollection = db.collection('users');
//   const result: User[] = await userCollection
//     .find({}, { projection: { password: 0, _id: 0 } })
//     .toArray();
//   client.close();
//   if (!result) {
//     return {
//       props: {
//         users: [],
//       },
//     };
//   } else {
//     return {
//       props: {
//         users: result,
//       },
//     };
//   }
// };

export default UsersPage;
