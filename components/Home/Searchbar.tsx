import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Input from '../UI/Input';
import { ChangeEvent, useEffect, useState } from 'react';
import { searchUser } from '../../utils/api';
import { CircularProgress } from '@material-ui/core';
import { useDebounce } from '../../utils/hooks';
import styles from '../../styles/Home.module.css';

const Searchbar = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(search, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!!search) {
      setLoading(true);
      searchUser(search).then(() => setLoading(false));
    }
  }, [debouncedValue]);

  return (
    <div>
      <div className={styles.Search}>
        <FontAwesomeIcon icon={faSearch} />
        <Input
          type="text"
          value={search}
          onChange={handleChange}
          label="Search for friends"
        />
        {loading && (
          <div style={{ transform: 'translate(-20px,0)', width: 0 }}>
            <CircularProgress className={styles.neutral} size="20px" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
