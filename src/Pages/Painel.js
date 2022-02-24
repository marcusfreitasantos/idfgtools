import React from "react";
import { UserContext } from "../UserContext";
import { useNavigate, Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Painel/Sidebar";
import Header from "../Components/Painel/Header";
import Ipads from "../Pages/Ipads";
import Perfil from "../Pages/Perfil";
import Usuarios from "../Pages/Usuarios";
import Dashboard from "../Pages/Dashboard";
import "./Painel.css";
import User from "../Pages/User";
import NewUser from "./NewUser";

export default function Painel() {
  const { data, login, userLogout } = React.useContext(UserContext);

  const userRole = data.role;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!login) {
      navigate("/");
    } else if (login && userRole === "editor") {
      navigate("/painel");
    } else if (login && userRole === "administrator") {
      navigate("/painel");
    } else {
      userLogout();
    }
  }, []);

  return (
    <section className="main d-flex">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="ipads" element={<Ipads />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="usuarios/:userid" element={<User />} />
            <Route path="usuarios/novo" element={<NewUser />} />
          </Routes>
        </div>
      </div>
    </section>
  );
}
