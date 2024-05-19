import { useState } from "react";
import styles from "./CreateCompany.module.css";
import Banner from "../components/layout/Banner";
import Input from "../components/form/Input";
import SubmitButton from "../components/form/SubmitButton";
import { companies } from "../data/data";

function CreateCompany() {
  function cadastrarEmpresa(e) {
    e.preventDefault(); 
    const newCompany = {
      id: companies.length, // Define o novo ID baseado no comprimento atual do array companies
      name: name,
      cnpj: cnpj,
      phone: phone,
    };
    console.log("Empresa cadastrada!", newCompany);
    companies.push(newCompany);
    console.log("Lista de empresas atualizada:", companies);
    // Limpa os campos do formulário após o cadastro
    setName("");
    setCNPJ("");
    setPhone("");
  }

  const [name, setName] = useState("");
  const [cnpj, setCNPJ] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <Banner text="Cadastro de Empresa" />
      <div className={styles.card}>
        <form onSubmit={cadastrarEmpresa}>
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
              text="CNPJ"
              name="cnpj"
              handleOnChange={(e) => setCNPJ(e.target.value)}
              value={cnpj || ""}
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
          <SubmitButton text="Confirmar" />
        </form>
      </div>
    </div>
  );
}

export default CreateCompany;