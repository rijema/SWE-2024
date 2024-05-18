import React, { useEffect, useState } from "react";
import Row from "../components/row/Row.js";
import Input from "../components/form/Input.js";
import { users } from "../data/data.js";
import Banner from "../components/layout/Banner.js";
import SubmitButton from "../components/form/SubmitButton.js";
import styles from './UserSearch.module.css'

export default function UserSearch() {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(null);
  const [valor, setValor] = useState("");
  const [editingPerson, setEditingPerson] = useState(null);

  useEffect(() => {
    setPeople(users);
  }, []);

  function aoClicado(id) {
    const filteredPeople = people.filter((person) => person.id !== id);
    setPeople(filteredPeople);
  }

  function aoAlterado(e) {
    const inputValue = e.target.value;
    setValor(inputValue);

    if (inputValue === "") {
      setPerson(null);
    } else {
      const pessoaEncontrada = users.find((pessoa) =>
        pessoa.cpf.toLowerCase().includes(inputValue.toLowerCase())
      );
      setPerson(pessoaEncontrada);
    }
  }

  function aoEditado(id) {
    const personToEdit = people.find((person) => person.id === id);
    setEditingPerson(personToEdit);
  }

  function atualizarCliente() {
    const updatedPeople = people.map((person) => {
      if (person.id === editingPerson.id) {
        return editingPerson;
      }
      return person;
    });
    setPeople(updatedPeople);
    setEditingPerson(null); // Limpa o estado de edição após a atualização
  }

  const listUsers = people.map((person) => (
    <Row
      key={person.id}
      name={person.name}
      cpf={person.cpf}
      phone={person.phone}
      birthday={person.birthday}
      aoClicado={() => aoClicado(person.id)}
      aoEditado={() => aoEditado(person.id)} // Passa a função aoEditado para o componente Row
    />
  ));

  return (
    <div>
      <div>
        <Banner text={"Clientes"} />
        <div className={`${styles.card} ${editingPerson ? styles.editing : ""}`}> {/* Adiciona a classe "editing" se está no modo de edição */}
          <div className={styles.inputLeft}>
            {editingPerson ? null : ( // Oculta o campo de busca se existe uma pessoa em edição
              <Input
                type="text"
                text="BUSCAR CLIENTE:"
                placeholder="Digite o CPF"
                handleOnChange={aoAlterado}
                value={valor}
              />
            )}
          </div>

          <section className=" w-full">
            {editingPerson ? null : ( // Oculta o cabeçalho da tabela se existe uma pessoa em edição
              <table className="w-full mt-2 mb-2 bg-gray-50  flex items-center">
                <td className={styles.cabecario} style={{ width: "35%" }}>
                  NOME
                </td>
                <td className={styles.cabecario} style={{ width: "15%" }}>
                  CPF
                </td>
                <td className={styles.cabecario} style={{ width: "15%" }}>
                  TELEFONE
                </td>
                <td className={styles.cabecario} style={{ width: "15%" }}>
                  NASCIMENTO
                </td>
                <td
                  className={styles.cabecario}
                  style={{ width: "20%", backgroundColor: "#FFFFFF", color: "#FFFFFF" }}
                >
                  empty
                </td>
              </table>
            )}
          </section>

          <section className=" w-full">
            {editingPerson ? ( // Se existe uma pessoa em edição, mostra o formulário de edição
              <div>
                <div className={styles.inputContainer}>
                  <Input
                    type="text"
                    text="Nome"
                    placeholder="Digite o nome"
                    handleOnChange={(e) => setEditingPerson({ ...editingPerson, name: e.target.value })}
                    value={editingPerson.name}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    type="text"
                    text="CPF"
                    placeholder="Digite o CPF"
                    handleOnChange={(e) => setEditingPerson({ ...editingPerson, cpf: e.target.value })}
                    value={editingPerson.cpf}
                  />
                </div>
                <div className={styles.inputContainer}>
                <Input
                  type="text"
                  text="Telefone"
                  placeholder="Digite o telefone"
                  handleOnChange={(e) => setEditingPerson({ ...editingPerson, phone: e.target.value })}
                  value={editingPerson.phone}
                />
                </div>
                <div className={styles.inputContainer}>
                  <Input
                    type="date"
                    text="Data de Nascimento"
                    placeholder="Selecione a data de nascimento"
                    handleOnChange={(e) => setEditingPerson({ ...editingPerson, birthday: e.target.value })}
                    value={editingPerson.birthday}
                  />
                </div>
            
                <SubmitButton text="Atualizar" onClick={atualizarCliente} />
              </div>
            ) : person ? ( // Se existe uma pessoa encontrada, mostra apenas ela
              <Row
                name={person.name}
                cpf={person.cpf}
                phone={person.phone}
                birthday={person.birthday}
                aoClicado={() => aoClicado(person.id)}
              />
            ) : (
              <ul>{listUsers}</ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
