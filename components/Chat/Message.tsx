import React from 'react';
import { useEffect, useState } from 'react';
import { Message } from '../../AppTypes';
import { useAppSelector } from '../../store/hooks';
import { converToDate, getTimeDifference } from '../../utils/util';
import styles from '../../styles/Chat.module.css';

interface Props {
  message: Message;
}

const MessageContainer = ({ message }: Props): JSX.Element => {
  const [dateDif, setDateDif] = useState(getTimeDifference(message.date));
  const [showDetails, setShowDetails] = useState(false);

  const userId: string =
    useAppSelector((state) => state.userState.user?.uid) || '';

  const classList: string[] = [styles.message];

  const showDetailsHandler = () => {
    setShowDetails(!showDetails);
  };

  if (!!userId) {
    if (userId === message.senderUid) {
      classList.push(styles.sender);
    } else {
      classList.push(styles.receiver);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDateDif(getTimeDifference(message.date));
    }, 60000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <div
        className={[styles.description, showDetails && styles.visible].join(
          ' '
        )}
      >
        {converToDate(message.date)}
      </div>

      <div className={classList.join(' ')}>
        <div className={styles.messageText} onClick={showDetailsHandler}>
          {message.message}
        </div>
        <div
          className={[styles.description, showDetails && styles.visible].join(
            ' '
          )}
        >
          {dateDif}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
