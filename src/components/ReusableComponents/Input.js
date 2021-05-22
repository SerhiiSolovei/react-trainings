import styles from './Input.module.scss';

const func = () => {};

const Input = ({
  label = null,
  id = null,
  value,
  type = 'text',
  onChange = func,
  placeholder,
  inputClassName = styles.Input,
  labelClassName = styles.InputLabel,
  onKeyUp = func,
  onFocus = func,
  onBlur = func,
}) => {
  return (
    <>
      {label !== null ? (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      ) : null}
      <input
        id={id}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={inputClassName}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </>
  );
};

export default Input;
