import React from "react";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { Link, useNavigate } from "react-router-dom";
import UseForm from "../../Hooks/UseForm";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";

export default function LoginCreate() {
  const username = UseForm();
  const email = UseForm("email");
  const password = UseForm();
  const { userLogin } = React.useContext(UserContext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = USER_POST({
      nome: username.value,
      email: email.value,
      senha: password.value,
    });
    const response = await fetch(url, options);
    const json = await response.json();
    console.log("response:", response, "json:", json);
    if (response.ok) {
      userLogin(username.value, password.value);
      navigate("/login");
    }
  }

  return (
    <div className="animeLeft">
      <h1 className="title">Cadastrar</h1>
      <div className="row">
        <form className="formField" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome de usuário"
            required
            {...username}
          />
          <Input type="email" placeholder="E-mail" required {...email} />
          <Input type="text" placeholder="Senha" required {...password} />

          <Button>Cadastrar</Button>
        </form>
        <Link to="/login/">Já tem conta? Faça Login</Link>
      </div>
    </div>
  );
}
