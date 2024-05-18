import React from 'react';
import styles_login from "./Login_Cliente.module.css";
import styles from "./CreateClient.module.css";
import Banner from "../components/layout/Banner";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";


import { useState } from "react";



function Login_Cliente () {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("OIOI",username,password);

    alert("Dados enviados!"+ "Bem-Vindo: "+ username + " Senha:" + password);
  };

  return (
    <div className={styles_login.container}>
      <form onSubmit={handleSubmit}>
        <Banner text="Login Cliente"/>
        <div className={styles.card}>
            <p>
              Login
            </p>
            <input className= {styles_login.inputBlock}
            type="user" 
            placeholder='Insira seu username'
            onChange={(e) => setUsername(e.target.value)} />
            <h2>
              Senha
            </h2>
            <input className={styles_login.inputBlock}
            type="password" 
            placeholder='senha'
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className= {styles_login.recall_forget}>
            <label htmlFor="">
                <input type="checkbox" />
                Lembre de mim
            </label>
            <a href="#">
              <p>Esqueceu a senha?</p>
              </a>
        </div>

        <button className={styles_login.button}>
          Entrar
          </button>

        <div>
            <p className= {styles_login.signup_link}>
              Não tem Conta?<a href='/'>Cadastrar</a>
            </p>
        </div>

      </form>
    </div>
  )
}

export default Login_Cliente
