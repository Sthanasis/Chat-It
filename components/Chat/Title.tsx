import React from 'react';
import styles from '../../styles/Chat.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface Props {
  children: React.ReactNode;
  onHideChat: () => void;
  onClose: () => void;
}

const Title = ({ children, onHideChat, onClose }: Props): JSX.Element => {
  return (
    <div className={styles.Title} onClick={onHideChat}>
      {children}
      <div className={styles.closeIcon} onClick={onClose}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
    </div>
  );
};

export default React.memo(Title);
