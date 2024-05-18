import React, { useEffect, useState } from "react";
import Row from "../components/row/Row.js";
import Input from "../components/form/Input.js";
import { users } from "../data/data.js";
import Banner from "../components/layout/Banner.js";

export default function UserSearch() {
  const [people, setPeople] = useState([]); //esse estado básicamente está sendo usado para carregar inicialmetne no useEffect
  const [person, setPerson] = useState(null); //está sendo usado na função aoAlterado para retornar se existe ou não essa pessoa
  const [valor, setValor] = useState(""); //esse valor está sendo usado no input, consequentemente vai ser usado na função aoALterado

  useEffect(() => {
    setPeople(users);
  }, []);

  //ESSA FUNÇÃO VAI PERCORRER O ID E COLOCAR NO SETPEOPLE OS QUE NÃO FORAM CLICADOS.
  // aqui nesssa função qnd for para o back end deve ir na rota delete do ID, mas aqui pode ser feito de uma forma para salvar o json, mas é um trabalho a mais.
  function aoClicado(id) {
    const filteredPeople = people.filter((person) => person.id !== id);
    setPeople(filteredPeople);
  }

  //ESSA FUNÇÃO ESTÁ BUSCANDO PELO CPF QUE EXISTE, E VAI COLOCAR NO SETPESSOA SE FOR ENCONTRADA
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

  const listUsers = people.map((person) => (
    <Row
      key={person.id}
      name={person.name}
      cpf={person.cpf}
      phone={person.phone}
      birthday={person.birthday}
      aoClicado={() => aoClicado(person.id)}
    />
  ));

  return (
    <div>
      <div>
        <Banner text={"Busca de usuário"} />
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full border-2 ">
        <div className=" w-5/6 mt-8 flex flex-col justify-center items-center border-black px-9 py-9 bg-slate-300 rounded-2xl">
          <section className=" flex flex-col w-full">
            <label>BUSCAR USUÁRIO </label>
            <input
              type="text"
              onChange={aoAlterado}
              value={valor}
              placeholder="DIGITE O CPF"
              className=" rounded-md px-2"
            ></input>
          </section>
          <section className=" w-full">
            <table className="w-full mt-2 mb-2 bg-gray-50  flex items-center">
              <td
                className="flex justify-center  border-r-2"
                style={{ width: "35%" }}
              >
                NOME
              </td>
              <td
                className="flex justify-center  border-r-2"
                style={{ width: "15%" }}
              >
                CPF
              </td>
              <td
                className="flex justify-center  border-r-2"
                style={{ width: "15%" }}
              >
                PHONE
              </td>
              <td
                className="flex justify-center  border-r-2"
                style={{ width: "15%" }}
              >
                NASCIMENTO
              </td>
              <td
                className="flex justify-center border-r-2"
                style={{ width: "20%" }}
              ></td>
            </table>
          </section>

          <section className=" w-full">
            {person ? ( //SE PESSOA EXISTE, QUE FOI ENCONTRADO NA FUNÇÃO AOALTERATO, VAI MOSTRAR APENAS ELE, SE NÃO, IRÁ MOSTRAR A LSITA COMPLETA
              <div>
                <Row
                  name={person.name}
                  cpf={person.cpf}
                  phone={person.phone}
                  birthday={person.birthday}
                  aoClicado={() => aoClicado(person.id)}
                />
              </div>
            ) : (
              <ul>{listUsers}</ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
