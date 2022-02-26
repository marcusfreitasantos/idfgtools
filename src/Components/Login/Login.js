import React from "react";
import LoginForm from "./LoginForm";
import LoginPasswordLost from "./LoginPasswordLost.js";
import LoginPasswordReset from "./LoginPasswordReset";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from "../../img/logo/logo_idfg.svg";
import { UserContext } from "../../UserContext";

export default function Login() {
  const { login } = React.useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (login === true) {
      navigate("/painel");
    }
  }, [login]);

  return (
    <section className="login">
      <div className="container d-flex justify-content-between flex-column">
        <img src={Logo} alt="logotipo" className="logo" />
        <div className="row d-flex align-items-center">
          <div className="col-md-6">
            <Routes>
              <Route path="/" element={<LoginForm />} />
              {/* <Route path="criar" element={<LoginCreate />} /> */}
              <Route path="perdeu" element={<LoginPasswordLost />} />
              <Route path="resetar" element={<LoginPasswordReset />} />
            </Routes>
          </div>
        </div>
      </div>
    </section>
  );
}
