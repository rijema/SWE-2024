import styles from "./Banner.module.css";

function Banner({ text }) {
  return (
    <div className={styles.banner}>
      <h1>{text}</h1>
    </div>
  );
}

export default Banner;
