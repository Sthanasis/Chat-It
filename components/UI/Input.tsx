import { InputPropsType } from '../../AppTypes';
import styles from '../../styles/Input.module.css';
import { useState } from 'react';

const Input = ({
  type,
  onChange,
  value,
  inputType,
  label,
}: InputPropsType): JSX.Element => {
  let input = null;
  let classList: string[] = [];
  const [focus, setFocusState] = useState(false);

  if (focus) {
    classList.push(styles.focus);
  }

  if (value.trim() !== '') {
    classList.push(styles.hasValue);
  }

  if (!inputType) {
    input = (
      <div className={styles.input}>
        <input
          value={value}
          onChange={onChange}
          type={type}
          onFocus={() => setFocusState(true)}
          onBlur={() => setFocusState(false)}
        />
        <label className={classList.join(' ')}>{label}</label>
      </div>
    );
  } else {
    input = <select></select>;
  }
  return input;
};

export default Input;
