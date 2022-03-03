import React from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import { Home, Tablet, Users, User, Power } from "react-feather";
import avatar from "../../../src/img/avatar.png";
import Logo from "../../../src/img/logo/logo_idfg_branco.svg";
import "./Sidebar.css";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const { userLogout } = React.useContext(UserContext);
  const currentUser = useSelector((state) => state.user.value);

  return (
    <>
      <div className="sidebar">
        <div>
          <div className="d-flex justify-content-center pt-4">
            <img src={Logo} alt="logo" style={{ maxWidth: "150px" }}></img>
          </div>

          <div className="user-info text-center ">
            <img
              src={currentUser.avatar ? currentUser.avatar : avatar}
              className="avatar"
              alt="avatar"
            ></img>
            <h1 className="user-name"> {currentUser.nome} </h1>
            <h2 className="user-role">{currentUser.funcao}</h2>
          </div>

          <div className="divisor-azul"></div>

          <div className="sidebar-menu">
            <ul>
              <li className="nav-item">
                <Link to="/painel">
                  <Home />
                  Painel
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/painel/ipads">
                  <Tablet />
                  Ipads
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/painel/usuarios">
                  <Users />
                  Usuários
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/painel/perfil">
                  <User />
                  Perfil
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-loggout">
          <div className="divisor-azul"></div>
          <button onClick={userLogout}>
            <Power />
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
