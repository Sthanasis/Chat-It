import React from 'react';
import styles from '../../styles/Chat.module.css';

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props): JSX.Element => {
  return <div className={styles.Title}>{children}</div>;
};

export default React.memo(Title);
