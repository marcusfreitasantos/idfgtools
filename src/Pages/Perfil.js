import React from "react";
import UserProfile from "../Components/Painel/UserProfile";

export default function Perfil() {
  return (
    <>
      <div className="ipads-header row d-flex justify-content-between">
        <div className="col-md-12">
          <h1 className="title">Meu Perfil</h1>
          <p>Altere seus dados, email, senha e foto de perfil.</p>
        </div>
      </div>

      <div className="divisor-azul"></div>

      <UserProfile />
    </>
  );
}
