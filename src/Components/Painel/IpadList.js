import React from "react";
import { Tablet, Eye, Trash, Search } from "react-feather";
import { Link } from "react-router-dom";
import { IPADS_GET } from "../../api";

export default function IpadList() {
  const token = localStorage.getItem("Token");
  const [ipads, setIpads] = React.useState();
  const [disabled, setDisabled] = React.useState(false);

  async function getIpads() {
    const { url, options } = IPADS_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setIpads(json);
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
  }, []);

  return (
    <>
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
                  <th scope="col">Numeração do Ipad</th>
                  <th scope="col">Número de Série</th>
                  <th scope="col">Status</th>
                  <th scope="col">Responsável</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {ipads &&
                  ipads.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td> {item.id} </td>
                        <td>{item.nome}</td>
                        <td>{item.numero_de_serie}</td>
                        {item.status_do_ipad === "ocupado" ? (
                          <td className="ocupado"> {item.status_do_ipad}</td>
                        ) : (
                          <td className="disponivel"> {item.status_do_ipad}</td>
                        )}
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
                  })}
              </tbody>
            </table>

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
        </div>
      </div>
    </>
  );
}
