import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import UseForm from "../../Hooks/UseForm";
import { PASSWORD_LOST } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Painel/Modal";
import { UserContext } from "../../UserContext";

export default function LoginPasswordLost() {
  const email = UseForm();
  const [data, setData] = React.useState();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const { setModal, modal } = React.useContext(UserContext);

  function handleClick(e) {
    e.preventDefault();
    navigate("/login/resetar");
    setModal(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (email.validate()) {
      try {
        const { url, options } = PASSWORD_LOST({
          email: email.value,
        });
        const response = await fetch(url, options);
        if (!response.ok)
          throw new Error("Nenhum usuário encontrado com este e-mail.");
        const json = await response.json();
        setData(json);
        console.log("Response:", response, "Json:", json);
        setModal(true);
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
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
      {error && <p className="error">{error}</p>}
      <Link to="/login">Lembrou a Senha?</Link>
      {!error && modal && (
        <Modal
          onClick={handleClick}
          title="Código enviado"
          text="Enviamos um código para o seu e-mail."
        >
          Confirmar
        </Modal>
      )}
    </section>
  );
}
