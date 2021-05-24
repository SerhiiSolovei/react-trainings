import styles from './Input.module.scss';

const Input = ({
  label = null,
  id = null,
  value,
  type = 'text',
  inputClassName = '',
  labelClassName = '',
  ...rest
}) => {
  return (
    <>
      {label !== null ? (
        <label htmlFor={id} className={`${styles.InputLabel} ${labelClassName}`}>
          {label}
        </label>
      ) : null}
      <input {...rest} id={id} value={value} type={type} className={`${styles.Input} ${inputClassName}`} />
    </>
  );
};

export default Input;
