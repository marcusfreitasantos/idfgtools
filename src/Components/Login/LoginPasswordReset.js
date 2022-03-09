import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import UseForm from "../../Hooks/UseForm";
import { PASSWORD_RESET, PASSWORD_CODE_VALIDATE } from "../../api";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../Painel/Modal";
import { UserContext } from "../../UserContext";

export default function LoginPasswordReset() {
  const [email, setEmail] = React.useState();
  const [code, setCode] = React.useState();
  const password = UseForm();
  const navigate = useNavigate();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { setModal, modal } = React.useContext(UserContext);

  function handleClick(e) {
    e.preventDefault();
    navigate("/login");
    setModal(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { url, options } = PASSWORD_CODE_VALIDATE({
        email: email,
        code: code,
      });
      const response = await fetch(url, options);
      if (!response.ok)
        throw new Error("Código inválido ou e-mail não cadastrado");
      const json = await response.json();
      console.log(json);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      await updatePassword();
      setLoading(false);
      setModal(true);
    }
  }

  async function updatePassword() {
    const { url, options } = PASSWORD_RESET({
      email: email,
      code: code,
      password: password.value,
    });
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
  }

  return (
    <section>
      <h1 className="title">Nova senha</h1>
      <p className="mb-2">
        Digite abaixo o código que enviamos para o seu email e a sua nova senha.
      </p>
      <form className="formField" onSubmit={handleSubmit}>
        <Input
          placeholder="Código"
          type="number"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Input
          placeholder="e-mail"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Sua nova senha"
          type="password"
          required
          {...password}
        />
        {loading ? (
          <Button disabled>Alterando...</Button>
        ) : (
          <Button>Alterar Senha</Button>
        )}
      </form>

      {error && <p className="error">{error}</p>}
      <Link to="/login">Lembrou a Senha?</Link>

      {modal && (
        <Modal
          onClick={handleClick}
          title="Senha alterada"
          text="Você já pode logar no sistema com a nova senha."
        >
          Confirmar
        </Modal>
      )}
    </section>
  );
}
