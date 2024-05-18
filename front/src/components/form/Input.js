import styles from "./Input.module.css";

function Input({ type, text, name, placeholder, handleOnChange, value }) {
  return (
    <div>
      <label htmlFor={name} className={styles.description}>
        {text}
      </label>
      <input
        className={styles.box}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        required={true}
      ></input>
    </div>
  );
}

export default Input;
