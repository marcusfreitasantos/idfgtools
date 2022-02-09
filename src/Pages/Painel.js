import React from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function Painel() {
  const { data, userLogout, login } = React.useContext(UserContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, []);

  console.log(login);

  return (
    <div>
      Olá, {data && data.role}
      <button onClick={userLogout}>Sair</button>
    </div>
  );
}
