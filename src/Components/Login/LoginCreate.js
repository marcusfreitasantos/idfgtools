import React from "react";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { useNavigate } from "react-router-dom";
import UseForm from "../../Hooks/UseForm";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import Modal from "../Painel/Modal";

export default function LoginCreate() {
  const [nome, setNome] = React.useState();
  const [sobrenome, setSobrenome] = React.useState();
  const [setor, setSetor] = React.useState();
  const [tel, setTel] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const email = UseForm("email");
  const password = UseForm();

  const { setModal } = React.useContext(UserContext);

  const navigate = useNavigate();

  function handleClick() {
    setModal(false);
    navigate("/painel/usuarios");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const { url, options } = USER_POST({
      email: email.value,
      senha: password.value,
      nome: nome,
      sobrenome: sobrenome,
      setor: setor,
      telefone: tel,
    });
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setModal(true);
      } else {
        throw new Error("E-mail já cadastrado. Utilize outro e-mail.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animeLeft" id="login-create">
      <div className="row">
        <form className="formField" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome"
            label="Nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Sobrenome"
            label="Sobrenome"
            id="sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Telefone"
            label="Telefone"
            id="tel"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Setor"
            label="Setor"
            id="setor"
            value={setor}
            onChange={(e) => setSetor(e.target.value)}
          />
          <Input
            type="email"
            placeholder="E-mail"
            required
            label="E-mail"
            id="email"
            {...email}
          />
          <Input
            type="password"
            placeholder="Senha"
            required
            label="Senha"
            id="senha"
            {...password}
          />

          {loading ? (
            <Button>Cadastrando...</Button>
          ) : (
            <Button>Cadastrar</Button>
          )}
        </form>
      </div>
      {error && <p className="error">{error}</p>}
      <Modal
        onClick={handleClick}
        title="Usuário Criado"
        text="As informações foram salvas no sistema."
      >
        Confirmar
      </Modal>
    </div>
  );
}
