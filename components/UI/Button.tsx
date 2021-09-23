import { ButtonPropsType } from '../../AppTypes';
import styles from '../../styles/Button.module.css';

const Button = ({
  type,
  onClick,
  children,
  disabled,
  className,
  style,
}: ButtonPropsType): JSX.Element => {
  const classes = [`${styles.button}${!!className ? ' ' + className : ''}`];

  if (type === 'transparent') {
    classes.push(styles.transparent);
  }

  if (type === 'primary') {
    classes.push(styles.primary);
  }

  if (type === 'submit') {
    classes.push(styles.submit);
  }
  if (type === 'add') {
    classes.push(styles.add);
  }

  if (type === 'remove') {
    classes.push(styles.remove);
  }

  if (type === 'Male') classes.push(styles.Male);
  if (type === 'Female') classes.push(styles.Female);
  if (type === 'Other') classes.push(styles.Neutral);
  return (
    <button
      className={classes.join(' ')}
      disabled={disabled}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
