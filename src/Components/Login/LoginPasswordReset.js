import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import UseForm from "../../Hooks/UseForm";
import { PASSWORD_RESET } from "../../api";
import { useNavigate } from "react-router-dom";

export default function LoginPasswordReset() {
  const [login, setLogin] = React.useState();
  const [key, setKey] = React.useState();
  const password = UseForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = PASSWORD_RESET({
      login,
      key,
      password: password.value,
    });

    const response = await fetch(url, options);
    if (response.ok) {
      navigate("/login");
    }
    const json = response.json();
  }

  return (
    <section>
      <h1 className="title">Nova senha</h1>
      <form className="formField" onSubmit={handleSubmit}>
        <Input
          placeholder="Sua nova senha"
          type="password"
          required
          {...password}
        />
        <Button>Resetar</Button>
      </form>
    </section>
  );
}
