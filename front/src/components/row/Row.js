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
      <table className="flex w-full mb-0 border-b-2 border-blue-900 bg-sky-700 hover:bg-blue-500">
        <td
          className="flex justify-center items-center "
          style={{ width: "35%" }}
        >
          {name}
        </td>
        <td
          className=" flex justify-center items-center "
          style={{ width: "15%" }}
        >
          {cpf}
        </td>
        <td
          className=" flex justify-center items-center"
          style={{ width: "15%" }}
        >
          {phone}
        </td>
        <td
          className=" flex justify-center items-center"
          style={{ width: "15%" }}
        >
          {formattedBirthday}
        </td>
        <td
          className="flex justify-center items-center"
          style={{ width: "10%" }}
        >
          <button
            className=" bg-red-500 hover:bg-red-700 w-3/4 mt-1 mb-1 rounded-md"
            onClick={aoClicado}
          >
            DELETE
          </button>
        </td>
        <td className="flex justify-center " style={{ width: "10%" }}>
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
