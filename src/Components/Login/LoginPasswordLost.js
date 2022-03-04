import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import UseForm from "../../Hooks/UseForm";
import { PASSWORD_LOST } from "../../api";
import { Link } from "react-router-dom";

export default function LoginPasswordLost() {
  const email = UseForm();
  const [data, setData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (email.validate()) {
      const { url, options } = PASSWORD_LOST({
        email: email.value,
        url: "/login/resetar",
      });
      const response = await fetch(url, options);
      const json = await response.json();
      setData(json);
      setLoading(false);
      console.log("Response:", response, "Json:", json);
    }
  }
  return (
    <section>
      <h1 className="title">Perdeu a Senha?</h1>
      <form className="formField" onSubmit={handleSubmit}>
        <Input type="email" placeholder="Seu email" required {...email} />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar Email</Button>
        )}
      </form>
      {data && <p style={{ color: "#7CEA9C" }}>{data.message}</p>}
      <Link to="/login">Lembrou a Senha?</Link>
    </section>
  );
}
