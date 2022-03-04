import React from "react";
import Input from "../Components/Forms/Input";
import Button from "../Components/Forms/Button";
import Modal from "../Components/Painel/Modal";
import { IPADS_POST, GET_USERS } from "../api";
import { UserContext } from "../UserContext";
import { useNavigate, Link } from "react-router-dom";
import Select from "../Components/Forms/Select";

function NewIpad() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  const [nome, setNome] = React.useState();
  const [serial, setSerial] = React.useState();
  const [status, setStatus] = React.useState();
  const [responsavel, setResponsavel] = React.useState();
  const [turma, setTurma] = React.useState();
  const [serie, setSerie] = React.useState();
  const { setModal } = React.useContext(UserContext);
  const [users, setUsers] = React.useState();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { url, options } = IPADS_POST(token, {
      nome: nome,
      numero_de_serie: serial,
      status_do_ipad: status,
      responsavel: responsavel,
      turma: turma,
      serie: serie,
    });

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (response.ok) {
        setModal(true);
      } else {
        throw new Error(json.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    setModal(false);
    navigate("/painel/ipads");
  }

  async function getUsers() {
    setLoading(true);
    try {
      const { url, options } = GET_USERS(token);
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Nada encontrado");
      const json = await response.json();
      const professores = json.filter((item) => {
        if (!item.roles[0].toLowerCase().includes("administrator")) {
          return item;
        }
      });
      setUsers(professores);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="ipads-header row d-flex justify-content-between">
        <div className="col-md-8">
          <h1 className="title">Novo Ipad</h1>
          <p>Cadastre um novo Ipad</p>
        </div>
      </div>

      <div className="divisor-azul"></div>

      <div className="animeLeft" id="login-create">
        <div className="row">
          <form className="formField" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Nome"
              label="Nome"
              id="nome"
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Número de Série"
              label="Número de Série"
              id="serial"
              onChange={(e) => setSerial(e.target.value)}
            />

            <Select
              label="Status"
              id="status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="0" disabled selected>
                Escolha um Status
              </option>
              ,<option value="disponível">Disponível</option>
              <option value="ocupado">Ocupado</option>
            </Select>

            <Select
              label="Responsavel"
              id="responsavel"
              onChange={(e) => setResponsavel(e.target.value)}
            >
              <option defaultValue="0" selected="true" disabled="disabled">
                Escolha um responsável
              </option>

              <option value="Nenhum">Nenhum</option>
              {users &&
                users.map((item) => {
                  return (
                    <option key={item.id} value={item.nome}>
                      {item.nome}
                    </option>
                  );
                })}
            </Select>

            <Input
              type="text"
              placeholder="Turma"
              required
              label="Turma"
              id="turma"
              onChange={(e) => setTurma(e.target.value)}
            />
            <Input
              type="serie"
              placeholder="Série"
              required
              label="Série"
              id="serie"
              onChange={(e) => setSerie(e.target.value)}
            />

            <div className="">
              <Link to="/painel/ipads" className="btn btn-light">
                Cancelar
              </Link>
              {loading ? (
                <Button>Cadastrando...</Button>
              ) : (
                <Button>Cadastrar</Button>
              )}
            </div>
          </form>
        </div>
        {error && <p className="error">{error}</p>}
        <Modal
          onClick={handleClick}
          title="Ipad Criado"
          text="As informações foram salvas no sistema."
        >
          Confirmar
        </Modal>
      </div>
    </>
  );
}

export default NewIpad;
