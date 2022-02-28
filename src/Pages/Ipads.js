import React from "react";
import IpadList from "../Components/Painel/IpadList";
import { Link } from "react-router-dom";

export default function Ipads() {
  return (
    <>
      <div className="ipads-header row d-flex justify-content-between">
        <div className="col-md-6">
          <h1 className="title">Gerenciamento de Ipads</h1>
          <p>
            Adicione, edite, exclua e gerencie todos os Ipads cadastrados no
            banco de dados.
          </p>
        </div>

        <div className="col-md-6 text-right">
          <div className="d-flex justify-content-end align-items-center h-100">
            <Link to="/painel/ipads/novo" className="btn btn-primary">
              Adicionar Novo
            </Link>
          </div>
        </div>
      </div>

      <div className="divisor-azul"></div>

      <IpadList />
    </>
  );
}
