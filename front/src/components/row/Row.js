import styles from './Row.module.css'

export default function Row({
  name,
  cpf,
  phone,
  birthday,
  aoClicado,
  aoEditado,
}) {
  const formattedBirthday = new Date(birthday).toLocaleDateString();
  return (
    <div>
      <table className={`flex w-full mb-0 ${styles.tabela}`}>

        <td
          className="rowCell flex justify-center items-center "
          style={{ width: "35%" }}
        >
          {name}
        </td>
        <td
          className="rowCell flex justify-center items-center "
          style={{ width: "15%" }}
        >
          {cpf}
        </td>
        <td
          className="rowCell flex justify-center items-center"
          style={{ width: "15%" }}
        >
          {phone}
        </td>
        <td
          className="rowCell flex justify-center items-center"
          style={{ width: "15%" }}
        >
          {formattedBirthday}
        </td>
        <td
          className="flex bg-white justify-center items-center"
          style={{ width: "10%" }}
        >
          <button
            className="rowCell bg-red-500 hover:bg-red-800 w-3/4 mt-1 mb-1 rounded-md"
            onClick={aoClicado}
          >
            DELETE
          </button>
        </td>
        <td className="flex bg-white justify-center " style={{ width: "10%" }}>
          <button
            className=" bg-sky-500 hover:bg-sky-700 w-3/4 mt-1 mb-1 rounded-md"
            onClick={aoEditado}
          >
            {" "}
            UPDATE{" "}
          </button>
        </td>
      </table>
    </div>
  );
}