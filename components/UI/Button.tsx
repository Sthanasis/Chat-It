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
  const classes = [`${styles.button}${className ? ' ' + className : ''}`];

  if (type === 'transparent') {
    classes.push(styles.transparent);
  }

  if (type === 'primary') {
    classes.push(styles.primary);
  }

  if (type === 'submit') {
    classes.push(styles.submit);
  }

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
