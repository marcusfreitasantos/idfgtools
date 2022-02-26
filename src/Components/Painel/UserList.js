import React from "react";
import { Tablet, Eye, Trash, Search } from "react-feather";
import { Link } from "react-router-dom";
import { GET_USERS, USER_DELETE } from "../../api";
import { UserContext } from "../../UserContext";
import Modal from "../Painel/Modal";

export default function UserList() {
  const token = localStorage.getItem("Token");
  const [users, setUsers] = React.useState();
  const { modal, setModal } = React.useContext(UserContext);
  const [userid, setUserid] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();

  async function getUsers() {
    setLoading(true);
    try {
      const { url, options } = GET_USERS(token);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Nada encontrado");
      const json = await response.json();
      console.log(json);
      const professores = json.filter((item) => {
        if (!item.roles[0].toLowerCase().includes("administrator")) {
          return item;
        }
      });
      setUsers(professores);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUsers(e) {
    e.preventDefault();
    const { url, options } = USER_DELETE(token, userid);
    const response = await fetch(url, options);
    const json = await response.json();
    setModal(false);
  }

  function confirmUserDelete(e) {
    e.preventDefault();
    setModal(true);
    setUserid(e.currentTarget.id);
  }

  React.useEffect(() => {
    getUsers();
  }, [modal]);

  return (
    <>
      <div className="row mt-4 mb-4" id="ipads-list">
        <div className="col-md-12">
          <div className="card-table">
            <div className="table-header">
              <h5 className="card-title">
                <div className="icon-cor-secundaria">
                  <Tablet size={40} />
                </div>
                Lista de Usuários
              </h5>

              <form className="searchform">
                <input
                  type="search"
                  id="search"
                  name="search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search />
              </form>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Telefone</th>
                  <th scope="col">Função</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {searchTerm
                  ? users &&
                    users
                      .filter((item) => {
                        if (
                          item.name
                            .toString()
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return item;
                        }
                      })
                      .map((item) => {
                        return (
                          <tr key={item.id}>
                            <td> {item.id} </td>
                            <td>{item.nome}</td>
                            <td>{item.user_email}</td>
                            <td>{item.telefone}</td>
                            <td> {item.roles[0]}</td>
                            <td>
                              <div className="d-flex">
                                <Link
                                  to={`/painel/usuarios/${item.id}`}
                                  className="view"
                                >
                                  <Eye />
                                </Link>
                                <button
                                  className="delete"
                                  id={item.id}
                                  onClick={confirmUserDelete}
                                >
                                  <Trash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  : users &&
                    users.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td> {item.id} </td>
                          <td>{item.nome}</td>
                          <td>{item.user_email}</td>
                          <td>{item.telefone}</td>
                          <td> {item.roles[0]}</td>
                          <td>
                            <div className="d-flex">
                              <Link
                                to={`/painel/usuarios/${item.id}`}
                                className="view"
                              >
                                <Eye />
                              </Link>
                              <button
                                className="delete"
                                id={item.id}
                                onClick={confirmUserDelete}
                              >
                                <Trash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
            <div className="d-flex justify-content-center align-items-center">
              {loading && <div className="loader"></div>}
              {error && <p className="error"> {error} </p>}
            </div>
          </div>
        </div>

        {modal && (
          <Modal
            text="Você está certo disso?"
            title="Atenção"
            onClick={deleteUsers}
          >
            Confirmar Exclusão?
          </Modal>
        )}
      </div>
    </>
  );
}
