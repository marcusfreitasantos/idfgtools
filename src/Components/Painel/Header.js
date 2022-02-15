import React from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import { PlusCircle, Home } from "react-feather";
import avatar from "../../../src/img/avatar.jpg";
import "./Header.css";

export default function Header() {
  const { data, userLogout } = React.useContext(UserContext);

  return (
    <>
      <div className="header">
        <div className="row pb-2 pt-2">
          <div className="col-md-6 d-flex align-items-center">
            <Link
              to="/painel"
              className="d-flex align-items-center me-5"
              style={{ color: "#263775" }}
            >
              <Home size={20} />
              IDFG | Gestão de equipamentos
            </Link>

            <Link
              to="/painel"
              className="d-flex align-items-center"
              style={{ color: "#263775" }}
            >
              <PlusCircle size={20} />
              Novo
            </Link>
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <a href="/" onClick={userLogout}>
              {data && data.email}
              <img src={avatar} alt="avatar" className="header-avatar"></img>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
