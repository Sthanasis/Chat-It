import { ButtonPropsType } from '../../AppTypes';

const Button = ({
  type,
  onClick,
  children,
  disabled,
  className,
  style,
}: ButtonPropsType): JSX.Element => {
  const classes = [`custom-button${className ? ' ' + className : ''}`];

  if (type === 'transparent') {
    classes.push('button-transparent');
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
