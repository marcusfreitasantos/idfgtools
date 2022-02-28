import React, { useContext } from "react";
import { Tablet, Eye, Trash, Search } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { IPADS_GET, IPAD_DELETE } from "../../api";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Modal from "./Modal";

export default function IpadList() {
  const token = localStorage.getItem("Token");
  const [ipads, setIpads] = React.useState();
  const [disabled, setDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState();
  const [filter, setFilter] = React.useState("todos");
  const [ocupados, setOcupados] = React.useState();
  const [disponiveis, setDisponiveis] = React.useState();
  const [todos, setTodos] = React.useState();
  const navigate = useNavigate();
  const { modal, setModal } = useContext(UserContext);
  const [ipadId, setIpadId] = React.useState();

  async function getIpads() {
    setLoading(true);

    try {
      const { url, options } = IPADS_GET(token);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Nada encontrado");
      if (!response.status === 200) {
        navigate("/");
      }
      const json = await response.json();
      const ipadsOcupados = Array.from(json).filter((item) =>
        item.status_do_ipad.toLowerCase().includes("ocupado")
      );

      const ipadsDisponiveis = Array.from(json).filter((item) =>
        item.status_do_ipad.toLowerCase().includes("disponível")
      );

      setOcupados(ipadsOcupados);

      setDisponiveis(ipadsDisponiveis);

      setIpads(json);
      setTodos(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function checkUrl() {
    if (window.location.href === "http://localhost:3000/painel/ipads") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  React.useEffect(() => {
    getIpads();
    checkUrl();
  }, [modal]);

  function filterList(e) {
    e.preventDefault();
    switch (e.target.id) {
      case "disponivel":
        setFilter("disponivel");
        setIpads(disponiveis);
        break;

      case "ocupado":
        setFilter("ocupados");
        setIpads(ocupados);
        break;

      case "todos":
        setFilter("todos");
        setIpads(todos);
        break;

      default:
        setFilter("todos");
        setIpads(todos);
        break;
    }
  }

  function confirmIpadDelete(e) {
    e.preventDefault();
    setModal(true);
    setIpadId(e.currentTarget.id);
  }

  async function deleteIpad(e) {
    e.preventDefault();
    const { url, options } = IPAD_DELETE(token, ipadId);
    const response = await fetch(url, options);
    const json = await response.json();
    setModal(false);
  }

  return (
    <>
      <div className="filter-bar">
        <div className="row">
          <div className="col-md-3 d-flex m-4 justify-content-between">
            <Button
              onClick={filterList}
              id="todos"
              className={filter === "todos" ? "btn-primary" : "btn-light"}
            >
              TODOS
            </Button>
            <Button
              onClick={filterList}
              id="disponivel"
              className={filter === "disponivel" ? "btn-primary" : "btn-light"}
            >
              DISPONÍVEL
            </Button>
            <Button
              onClick={filterList}
              id="ocupado"
              className={filter === "ocupados" ? "btn-primary" : "btn-light"}
            >
              OCUPADO
            </Button>
          </div>
        </div>
      </div>
      <div className="row mb-4 mt-4" id="ipads-list">
        <div className="col-md-12">
          <div className="card-table">
            <div className="table-header">
              <h5 className="card-title">
                <div className="icon-cor-secundaria">
                  <Tablet size={40} />
                </div>
                Lista de Ipads
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
                  <th scope="col">Numeração do Ipad</th>
                  <th scope="col">Número de Série</th>
                  <th scope="col">Status</th>
                  <th scope="col">Responsável</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {searchTerm
                  ? ipads &&
                    ipads
                      .filter((item) => {
                        if (
                          item.nome
                            .toString()
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ) {
                          return item;
                        }
                      })
                      .map((item) => {
                        return (
                          <tr
                            key={item.id}
                            className={
                              item.status_do_ipad === "ocupado"
                                ? "ocupado"
                                : "disponivel"
                            }
                          >
                            <td> {item.id} </td>
                            <td>{item.nome}</td>
                            <td>{item.numero_de_serie}</td>
                            <td className="status"> {item.status_do_ipad} </td>
                            <td>{item.responsavel}</td>
                            <td>
                              <div className="d-flex">
                                <button className="view">
                                  <Eye />
                                </button>
                                <button className="delete">
                                  <Trash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                  : ipads &&
                    ipads.map((item) => {
                      return (
                        <tr
                          key={item.id}
                          className={
                            item.status_do_ipad === "ocupado"
                              ? "ocupado"
                              : "disponivel"
                          }
                        >
                          <td> {item.id} </td>
                          <td>{item.nome}</td>
                          <td>{item.numero_de_serie}</td>
                          <td className="status"> {item.status_do_ipad} </td>
                          <td>{item.responsavel}</td>
                          <td>
                            <div className="d-flex">
                              <Link
                                to={`/painel/ipads/${item.id}`}
                                className="view"
                              >
                                <Eye />
                              </Link>
                              <button
                                className="delete"
                                id={item.id}
                                onClick={confirmIpadDelete}
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

            {disabled ? (
              <Link to="/painel/ipads" className="btn btn-primary d-none">
                Ver todos
              </Link>
            ) : (
              <Link to="/painel/ipads" className="btn btn-primary">
                Ver todos
              </Link>
            )}
          </div>
          {modal && (
            <Modal
              text="Você está certo disso?"
              title="Atenção"
              onClick={deleteIpad}
            >
              Confirmar Exclusão?
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
