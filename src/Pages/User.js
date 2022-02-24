import React from "react";
import { GET_USERS, EDIT_USERS } from "../api";
import { useParams } from "react-router-dom";
import Button from "../Components/Forms/Button";
import Modal from "../Components/Painel/Modal";
import Input from "../Components/Forms/Input";
import Select from "../Components/Forms/Select";

import Avatar from "../img/avatar.jpg";
import { UserContext } from "../UserContext";

export default function User() {
  const { userid } = useParams();
  const id = parseInt(userid);

  const token = localStorage.getItem("Token");

  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState();

  const [nome, setNome] = React.useState();
  const [sobrenome, setSobrenome] = React.useState();
  const [email, setEmail] = React.useState();
  const [setor, setSetor] = React.useState();
  const [funcao, setFuncao] = React.useState();

  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const { modal, setModal } = React.useContext(UserContext);

  async function getUsers() {
    const { url, options } = GET_USERS(token);
    const response = await fetch(url, options);
    const json = await response.json();

    for (let i = 0; i < json.length; i++) {
      for (i = 0; i < json.length; i++) {
        if (json[i].id === id) {
          setUser(json[i]);
          console.log(json[i]);
        }
      }
    }
  }

  async function editUser() {
    setLoading(true);
    try {
      const { url, options } = EDIT_USERS(token, id, {
        name: nome,
        last_name: sobrenome,
        email: email,
        meta: {
          setor: setor,
        },
        roles: funcao,
      });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Usuário não possui permissão");
      const json = await response.json();
      setModal(true);
      setUser(json);
      setNome(user && user.nome);
      setSobrenome(user && user.last_name);
      setEmail(user && user.email);
      setFuncao(user && user.funcao);
      setSetor(user && user.setor);

      console.log(json);
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
    getUsers();
  }, []);

  return (
    <>
      <div className="ipads-header row d-flex justify-content-between">
        <div className="col-md-12">
          <h1 className="title"> {user && user.nome} </h1>
          <p>
            Aqui você pode atualizar os dados do{" "}
            <strong> {user && user.nome} </strong>{" "}
          </p>
        </div>
      </div>
      <div className="divisor-azul"></div>
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
                placeholder={user && user.nome}
              />

              <Input
                label="Sobrenome"
                id="sobrenome"
                type="text"
                value={sobrenome}
                placeholder={user && user.sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
              />

              <Input
                label="E-mail"
                id="email"
                type="email"
                value={email}
                placeholder={user && user.user_email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <Select
                label="role"
                id="role"
                value={funcao}
                onChange={(e) => setFuncao(e.target.value)}
              >
                {user && user.roles[0] === "professor"
                  ? [
                      <option selected value="professor">
                        Professor
                      </option>,
                      <option value="editor">Editor</option>,
                    ]
                  : [
                      <option value="professor">Professor</option>,
                      <option selected value="editor">
                        Editor
                      </option>,
                    ]}
              </Select>

              <Input
                label="Setor"
                id="setor"
                type="text"
                value={setor}
                placeholder={user && user.setor}
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
      )}{" "}
    </>
  );
}
