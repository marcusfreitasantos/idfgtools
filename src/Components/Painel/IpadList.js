import React from "react";
import { Tablet, Eye, Trash, Search } from "react-feather";
import Checkbox from "../../Components/Forms/Checkbox";
import { Link } from "react-router-dom";
import { IPADS_GET } from "../../api";

export default function IpadList() {
  //   const [ipads, setIpads] = React.useState();

  //   const token = localStorage.getItem("Token");

  //   async function getIpads() {
  //     const { url, options } = IPADS_GET(token);
  //     const response = await fetch(url, options);
  //     const json = await response.json();
  //     setIpads(json);
  //     //console.log("Ipads:", json);
  //   }

  //   React.useEffect(() => {
  //     getIpads();
  //   }, []);

  return (
    <>
      <div className="row" id="ipads-list">
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
                  <th scope="col">
                    <Checkbox />
                  </th>
                  <th scope="col">ID</th>
                  <th scope="col">Numeração do Ipad</th>
                  <th scope="col">Número de Serie</th>
                  <th scope="col">Status</th>
                  <th scope="col">Responsável</th>
                  <th scope="col">Função</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <Checkbox />
                  </th>
                  <td>1</td>
                  <td>IPAD001</td>
                  <td>1AB23CDE45#</td>
                  <td>Disponível</td>
                  <td>John Doe</td>
                  <td>Professor</td>
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
              </tbody>
            </table>

            <Link to="/ipads-list" className="btn btn-primary">
              {" "}
              Ver todos{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
