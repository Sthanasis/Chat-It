import React, { useEffect } from 'react';
import { SocketType } from '../../utils/sockets';
import Chat from '../Chat/Chat';
import { getUser, getAllUsers } from '../../utils/api';
import { User } from '../../AppTypes';
import Card from './Card';
import styles from '../../styles/Userstyles.module.css';
import router from 'next/router';

interface Props {
  socket: SocketType;
  users: User[];
}

const UserList = ({ socket, users }: Props): JSX.Element => {
  const getOne = async (uid: string) => {
    router.push(`/user/${uid}`);
  };

  return (
    <div className={styles.UsersContainer}>
      {users.map((user) => (
        <Card key={user.uid} user={user} onClick={getOne} />
      ))}
    </div>
  );
};

export default UserList;
