import React from 'react';
import styles from './SubmitButton.module.css';

function SubmitButton({ text, href }) {
  const handleButtonClick = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de um clique em um link
    window.location.href = href; // Redireciona para a URL especificada
  };

  return (
    <div>
      <a href={href} className={styles.btn} onClick={handleButtonClick}>
        {text}
      </a>
    </div>
  );
}

export default SubmitButton;
