import React from 'react';
import styles_login from "./Login_Cliente.module.css";
import styles from "./CreateClient.module.css";
import Banner from "../components/layout/Banner";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import styles_empresa from "./Login_Empresa.css"

import { useState } from "react";


function Login_Empresa () {
  const [userCompany, setuserCompany] = useState("");
  const [keywordCompany, setkeywordCompany] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("OIOI",userCompany,keywordCompany);

    alert("Dados enviados!"+ "Bem-Vindo: "+ userCompany + " Senha:" + keywordCompany);
  };

  return (
    <div className={styles_login.container}>
      <form onSubmit={handleSubmit}>
        <Banner text="Login Empresa"/>
        <div className={styles.card}>
            <p>
              Login
            </p>
            <input className= {styles_login.inputBlock}
            type="user" 
            placeholder='Insira seu login empresarial'
            onChange={(e) => setuserCompany(e.target.value)} />
            <h2>
              Senha
            </h2>
            <input className={styles_login.inputBlock}
            type="keywordCompany" 
            placeholder='Senha'
            onChange={(e) => setkeywordCompany(e.target.value)}/>
        </div>
        <div className= {styles_login.recall_forget}>
            <label htmlFor="">
                <input type="checkbox" />
                Salve meus Dados
            </label>
            <a href="#">
              <p>Esqueceu a senha?</p>
              </a>
        </div>

        <button className={styles_login.button}>
          <a href='/search'>Entrar</a>
          </button>

        <div>
            <p className= {styles_login.signup_link}>
              Empresa nova?
              <a href='/create_company'>Cadastrar</a>
            </p>
        </div>

      </form>
    </div>
  )

}

export default Login_Empresa

