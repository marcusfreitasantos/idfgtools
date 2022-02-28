import React from "react";
import { UserContext } from "../UserContext";
import { useNavigate, Route, Routes } from "react-router-dom";
import Sidebar from "../Components/Painel/Sidebar";
import Header from "../Components/Painel/Header";
import Ipads from "../Pages/Ipads";
import Perfil from "../Pages/Perfil";
import Usuarios from "../Pages/Usuarios";
import Dashboard from "../Pages/Dashboard";
import EditUsers from "./EditUsers";
import NewUser from "./NewUser";
import NewIpad from "./NewIpad";
import EditIpads from "./EditIpads";

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
        <div className="content" style={{ padding: "60px 20px" }}>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="ipads" element={<Ipads />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="usuarios/:userid" element={<EditUsers />} />
            <Route path="usuarios/novo" element={<NewUser />} />
            <Route path="ipads/novo" element={<NewIpad />} />
            <Route path="ipads/:ipadid" element={<EditIpads />} />
          </Routes>
        </div>
      </div>
    </section>
  );
}
