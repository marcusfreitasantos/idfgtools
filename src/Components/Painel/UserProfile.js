import React from "react";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Avatar from "../../img/avatar.jpg";
import "./UserProfile.css";
import { USER_PUT } from "../../api";
import Modal from "./Modal";
import { UserContext } from "../../UserContext";

export default function UserProfile() {
  const token = localStorage.getItem("Token");

  const [loading, setLoading] = React.useState(false);
  const [nome, setNome] = React.useState();
  const [sobrenome, setSobrenome] = React.useState();
  const [email, setEmail] = React.useState();
  const [setor, setSetor] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [user, setUser] = React.useState();
  const { modal, setModal, data } = React.useContext(UserContext);
  async function editUser() {
    setLoading(true);
    try {
      const { url, options } = USER_PUT(token, {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        setor: setor,
      });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Usuário não possui permissão");
      const json = await response.json();
      console.log("userPut: ", json);
      setModal(true);
      setUser(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    editUser();
  }

  React.useEffect(() => {
    setUser(data);
    setNome(data.nome);
    setSobrenome(data.sobrenome);
    setEmail(data.email);
    setSetor(data.setor);
  }, [data]);

  return (
    <>
      <form className="formField card-table" onSubmit={handleSubmit}>
        <div className="row d-flex align-items-center">
          <div className="col-md-8 row">
            <div className="col-md-6">
              <Input
                label="Nome"
                id="nome"
                type="text"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              />
              <Input
                label="Sobrenome"
                id="sobrenome"
                type="text"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
              />
              <Input
                label="E-mail"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
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
                    Salvar Alterações
                  </Button>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <Input
                label="Função"
                id="funcao"
                type="text"
                value={user && user.role}
                disabled
              />
              <Input
                label="Setor"
                id="setor"
                type="text"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
              />

              <Input
                label="Senha"
                id="senha"
                placeholder="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4 text-center">
            <img src={Avatar} alt={Avatar} className="user-img " />
            <div>
              <h5 className="subtitle">Alterar foto de perfil</h5>
              <Input
                type="file"
                id="imgUpload"
                name="avatar"
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </form>
      {error && <p className="error">{error}</p>}

      {modal && (
        <Modal
          title="Tudo OK!"
          text="Suas alterações foram salvas"
          onClick={() => setModal(false)}
        >
          Confirmar
        </Modal>
      )}
    </>
  );
}
