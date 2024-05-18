import { useState } from "react";
import styles from "./CreateClient.module.css";
import Banner from "../components/layout/Banner";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import { users } from "../data/data";

function CreateClient() {
  function cadastrarCliente(e) {
    e.preventDefault(); 
    const newClient = {
      id: users.length, // Define o novo ID baseado no comprimento atual do array users
      name: name,
      cpf: cpf,
      phone: phone,
      birthday: new Date(birthday),
    };
    console.log("Cliente cadastrado!", newClient);
    users.push(newClient);
    console.log("Lista de usuários atualizada:", users);
    // Limpa os campos do formulário após o cadastro
    setName("");
    setCpf("");
    setPhone("");
    setBirthday("");
  }

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");

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
              value={name || ""}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              text="CPF"
              name="cpf"
              handleOnChange={(e) => setCpf(e.target.value)}
              value={cpf || ""}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="text"
              text="Telefone"
              name="phone"
              handleOnChange={(e) => setPhone(e.target.value)}
              value={phone || ""}
            />
          </div>
          <div className={styles.inputContainer}>
            <Input
              type="date"
              text="Data de Nascimento"
              name="birthday"
              handleOnChange={(e) => setBirthday(e.target.value)}
              value={birthday || ""}
            />
          </div>
          <SubmitButton text="Confirmar" />
        </form>
      </div>
    </div>
  );
}

export default CreateClient;
