import styles from '../../styles/Loader.module.css';

const Loader = (): JSX.Element => {
  return (
    <div className={styles.Loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
