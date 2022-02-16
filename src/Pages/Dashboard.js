import React from "react";
import "./Dashboard.css";
import { BookOpen, Tablet } from "react-feather";
import IpadList from "../Components/Painel/IpadList";
import { GET_USERS, IPADS_GET } from "../api";

export default function Dashboard() {
  const [ipads, setIpads] = React.useState();
  const [disponiveis, setDisponiveis] = React.useState();
  const [ocupados, setOcupados] = React.useState();
  const [users, setUsers] = React.useState();

  const token = localStorage.getItem("Token");

  async function getIpads() {
    const { url, options } = IPADS_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setIpads(json);
    const ipadsDisponiveis = Array.from(json).filter((item) =>
      item.status_do_ipad.toLowerCase().includes("disponível")
    );

    const ipadsOcupados = Array.from(json).filter((item) =>
      item.status_do_ipad.toLowerCase().includes("ocupado")
    );

    setDisponiveis(ipadsDisponiveis);
    setOcupados(ipadsOcupados);
  }

  async function getUsers() {
    const { url, options } = GET_USERS(token);
    const response = await fetch(url, options);
    const json = await response.json();

    for (let i = 0; i < json.length; i++) {
      const permittedValues = [];
      for (i = 0; i < json.length; i++) {
        permittedValues[i] = json[i].roles[0];
      }

      const professores = permittedValues.filter((item) =>
        item.toLowerCase().includes("professor")
      );

      setUsers(professores);
    }
  }

  React.useEffect(() => {
    getIpads();
    getUsers();
  }, []);

  return (
    <>
      <div id="dashboard">
        <div className="row" id="cards">
          <div className="col-md-3">
            <div className="card">
              <h5 className="card-title">
                <div className="icon-cor-primaria">
                  <BookOpen size={50} />
                </div>
                Professores Cadastrados
              </h5>
              <span
                className="card-number"
                style={{ color: "var(--cor-primaria)" }}
              >
                {users && users.length}
              </span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <h5 className="card-title">
                <div className="icon-cor-secundaria">
                  <Tablet size={50} />
                </div>
                Ipads Cadastrados
              </h5>
              <span
                className="card-number"
                style={{ color: "var(--cor-secundaria)" }}
              >
                {ipads && ipads.length}
              </span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <h5 className="card-title">
                <div className="icon-cor-terciaria">
                  <Tablet size={50} />
                </div>
                Ipads Disponíveis
              </h5>
              <span
                className="card-number"
                style={{ color: "var(--cor-terciaria)" }}
              >
                {disponiveis && disponiveis.length}
              </span>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card">
              <h5 className="card-title">
                <div className="icon-cor-quaternaria">
                  <Tablet size={50} />
                </div>
                Ipads Ocupados
              </h5>
              <span
                className="card-number"
                style={{ color: "var(--cor-quaternaria)" }}
              >
                {ocupados && ocupados.length}
              </span>
            </div>
          </div>
        </div>

        <IpadList />
      </div>
    </>
  );
}
