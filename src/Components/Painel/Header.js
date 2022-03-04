import React from "react";
import { UserContext } from "../../UserContext";
import { Link } from "react-router-dom";
import { Home } from "react-feather";
import avatar from "../../../src/img/avatar.png";
import "./Header.css";
import { useSelector } from "react-redux";

export default function Header() {
  const currentUser = useSelector((state) => state.user.value);
  const { userLogout } = React.useContext(UserContext);

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
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <Link to="/" onClick={userLogout}>
              {currentUser.email}
              <img
                src={currentUser.avatar ? currentUser.avatar : avatar}
                alt="avatar"
                className="header-avatar"
              ></img>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
