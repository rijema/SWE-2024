import { useState } from "react";
import styles from "./CreateClient.module.css";
import Banner from "../components/layout/Banner";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";

function CreateClient() {
  function cadastrarCliente(e) {
    e.preventDefault();
    console.log("Cliente cadastrado!");
    console.log(name);
    console.log(cpf);
    console.log("oi");
    console.log(phone);
    console.log(birthday);
  }

  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [phone, setPhone] = useState();
  const [birthday, setBirthday] = useState();

  return (
    <div>
      <Banner text="Cadastro de Cliente" />
      <div className={styles.card}>
        <form onSubmit={cadastrarCliente}>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              text="Nome"
              name="name"
              handleOnChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              text="CPF"
              name="cpf"
              handleOnChange={(e) => setCpf(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              text="Telefone"
              name="phone"
              handleOnChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="date"
              text="Data de Nascimento"
              name="birthday"
              handleOnChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <SubmitButton text="Confirmar" />
        </form>
      </div>
    </div>
  );
}

export default CreateClient;
