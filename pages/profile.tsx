import { NextPage } from 'next';
import router from 'next/router';
import Profile from '../components/User/Profile';
import { useAppSelector } from '../store/hooks';

const UserProfilePage: NextPage = () => {
  const user = useAppSelector((state) => state.userState.user);

  return user ? <Profile user={user} /> : <div>Login</div>;
};

export default UserProfilePage;
