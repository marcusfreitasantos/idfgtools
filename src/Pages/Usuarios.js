import React from "react";
import UserList from "../Components/Painel/UserList";
import { Link } from "react-router-dom";

export default function Usuarios() {
  return (
    <>
      <div className="ipads-header row d-flex justify-content-between">
        <div className="col-md-8">
          <h1 className="title">Gerenciamento de Usuários</h1>
          <p>
            Adicione, edite, exclua e gerencie todos os Usuários cadastrados no
            banco de dados.
          </p>
        </div>

        <div className="col-md-4 text-right">
          <div className="d-flex justify-content-end align-items-center h-100">
            <Link className="btn btn-primary" to="/painel/usuarios/novo">
              Adicionar Novo
            </Link>
          </div>
        </div>
      </div>

      <div className="divisor-azul"></div>

      <UserList />
    </>
  );
}
