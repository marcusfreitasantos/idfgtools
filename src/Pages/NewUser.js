import React from "react";
import LoginCreate from "../Components/Login/LoginCreate";

function NewUser() {
  return (
    <>
      <div className="ipads-header row d-flex justify-content-between">
        <div className="col-md-8">
          <h1 className="title">Novo Usuário</h1>
          <p>Informe os dados e clique em cadastrar.</p>
        </div>
      </div>

      <div className="divisor-azul"></div>

      <LoginCreate />
    </>
  );
}

export default NewUser;
