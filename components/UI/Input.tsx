import { InputPropsType } from '../../AppTypes';
import styles from '../../styles/Input.module.css';
const Input = ({
  type,
  onChange,
  value,
  inputType,
  label,
}: InputPropsType): JSX.Element => {
  let input = null;
  if (!inputType) {
    input = (
      <div className={styles.input}>
        <label>{label}</label>
        <input value={value} onChange={onChange} type={type} />
      </div>
    );
  } else {
    input = <select></select>;
  }
  return input;
};

export default Input;
