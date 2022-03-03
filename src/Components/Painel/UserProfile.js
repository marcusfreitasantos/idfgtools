import React from "react";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Avatar from "../../img/avatar.png";
import "./UserProfile.css";
import { UPLOAD_MEDIA, USER_PUT } from "../../api";
import Modal from "./Modal";
import { UserContext } from "../../UserContext";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLoginRedux } from "../../Features/User";

export default function UserProfile() {
  const token = localStorage.getItem("Token");
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [nome, setNome] = React.useState();
  const [sobrenome, setSobrenome] = React.useState();
  const [email, setEmail] = React.useState();
  const [setor, setSetor] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const { modal, setModal, data } = React.useContext(UserContext);
  const currentUser = useSelector((state) => state.user.value);

  const [avatar, setAvatar] = React.useState();

  async function uploadMedia(e) {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("title", currentUser.nome + "_avatar");
    formData.append("caption", currentUser.nome + "_avatar");

    const { url, options } = UPLOAD_MEDIA(token, formData);

    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json.guid.raw);
    setAvatar(json.guid.raw);
  }

  async function editUser() {
    setLoading(true);
    try {
      const { url, options } = USER_PUT(token, {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        setor: setor,
        avatar: avatar,
      });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Usuário não possui permissão");
      const json = await response.json();
      console.log("userPut: ", json);
      setModal(true);
      dispatch(
        userLoginRedux({
          nome: json.first_name,
          sobrenome: json.last_name,
          email: json.user_email,
          funcao: json.roles,
          setor: json.setor,
          avatar: json.avatar,
        })
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    uploadMedia();
    editUser();
  }

  React.useEffect(() => {
    setNome(data.nome);
    setSobrenome(data.sobrenome);
    setEmail(data.email);
    setSetor(data.setor);
    setAvatar(data.avatar);
    console.log(data.avatar);
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
                value={currentUser.funcao}
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
            <img
              src={currentUser.avatar ? currentUser.avatar : avatar}
              alt="avatar"
              className="user-img "
            />
            <div>
              <h5 className="subtitle">Alterar foto de perfil</h5>
              <Input
                type="file"
                id="imgUpload"
                name="avatar"
                accept="image/*"
                onChange={uploadMedia}
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
