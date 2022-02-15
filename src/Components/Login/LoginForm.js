import React from "react";
import { Link } from "react-router-dom";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Checkbox from "../Forms/Checkbox";
import UseForm from "../../Hooks/UseForm";
import { UserContext } from "../../UserContext";

export default function LoginForm() {
  const username = UseForm();
  const password = UseForm();
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <div>
      <h2 className="title">Entrar</h2>
      <p className="text">
        Bem vindo de volta, por favor faça login para acessar o painel.
      </p>
      <form className="formField" onSubmit={handleSubmit}>
        <Input placeholder="Seu email" type="text" {...username} required />
        <Input placeholder="Senha" type="password" {...password} required />

        <div className="d-flex justify-content-between">
          <Checkbox label="Lembre-me" name="lembre" />
          <Link to="/login/perdeu">Perdeu sua senha?</Link>
        </div>

        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
          >
            Acessar
          </Button>
        )}
        {error && <p className="error">{error}</p>}
      </form>

      <Link to="/login/criar">Cadastro</Link>
    </div>
  );
}
