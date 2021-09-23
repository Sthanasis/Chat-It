import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useState } from 'react';

import UsersList from '../../components/User/UsersList';
import Loader from '../../components/utilities/Loader';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setConnections } from '../../store/reducers/userSlice';
import { getConnections } from '../../utils/api';
import { socket } from '../../utils/sockets';

const UsersPage: NextPage = () => {
  const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);
  const connectedTo = useAppSelector(
    (state) => state.userState.user?.connectedTo
  );
  const connections = useAppSelector((state) => state.userState.connections);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!localStorage.getItem('connections')) {
      if (connectedTo)
        getConnections(connectedTo)
          .then((res) => {
            setLoading(false);
            dispatch(setConnections(res.data.users));
            localStorage.setItem('connections', JSON.stringify(res.data.users));
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

export default UsersPage;
