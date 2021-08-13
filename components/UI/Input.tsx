import { InputPropsType } from '../../AppTypes';
import styles from '../../styles/Input.module.css';
import { useState } from 'react';
import { useRef } from 'react';

const Input = ({
  type,
  onChange,
  value,
  inputType,
  label,
  children,
  options,
  onClick,
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

  const selectOptionHandler = (option: string) => {
    if (onClick) {
      onClick(option);
      setFocusState(false);
    }
  };
  if (type !== 'select') {
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
    input = (
      <div className={styles.input} onFocus={() => setFocusState(true)}>
        <input type="text" value={value} onChange={() => {}} />
        <label className={classList.join(' ')}>{label}</label>
        {focus && (
          <div className={styles.options}>
            {options?.map((option) => (
              <div key={option} onClick={() => selectOptionHandler(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return input;
};

export default Input;
