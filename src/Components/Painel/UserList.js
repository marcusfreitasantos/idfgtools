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

  async function getUsers() {
    const { url, options } = GET_USERS(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setUsers(json);
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
                <input type="search" id="search" name="search" />
                <button>
                  <Search />
                </button>
              </form>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nome</th>
                  <th scope="col">email</th>
                  <th scope="col">Função</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.slice(1).map((item) => {
                    return (
                      <tr key={item.id}>
                        <td> {item.id} </td>
                        <td>{item.name}</td>
                        <td>{item.user_email}</td>
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
