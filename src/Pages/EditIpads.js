import React from "react";
import { UserContext } from "../UserContext";
import Button from "../Components/Forms/Button";
import Modal from "../Components/Painel/Modal";
import Input from "../Components/Forms/Input";
import Select from "../Components/Forms/Select";
import { IPADS_GET, GET_USERS, IPAD_EDIT } from "../api";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function EditIpads() {
  const [loading, setLoading] = React.useState(false);
  const [ipad, setIpad] = React.useState();

  const [error, setError] = React.useState();
  const token = localStorage.getItem("Token");
  const [nome, setNome] = React.useState();
  const [serial, setSerial] = React.useState();
  const [status, setStatus] = React.useState();
  const [responsavel, setResponsavel] = React.useState();
  const [turma, setTurma] = React.useState();
  const [serie, setSerie] = React.useState();
  const { modal, setModal } = React.useContext(UserContext);
  const [users, setUsers] = React.useState();
  const [select, setSelect] = React.useState();
  const { ipadid } = useParams();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    editIpad();
  }

  function handleClick(e) {
    e.preventDefault();
    setModal(false);
    navigate("/painel/ipads");
  }

  async function getIpads() {
    const { url, options } = IPADS_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    for (let i = 0; i < json.length; i++) {
      for (i = 0; i < json.length; i++) {
        if (json[i].id === ipadid) {
          setIpad(json[i]);
          setNome(json[i].nome);
          setSerial(json[i].numero_de_serie);
          setStatus(json[i].status_do_ipad);
          setResponsavel(json[i].responsavel);
          setTurma(json[i].turma);
          setSerie(json[i].serie);

          const status = json[i].status_do_ipad;

          if (status === "disponível") {
            setSelect([
              <option value="disponível" selected>
                Disponível
              </option>,
              <option value="ocupado">Ocupado</option>,
              <option value="manutenção">Manutenção</option>,
            ]);
          } else if (status === "ocupado") {
            setSelect([
              <option value="ocupado" selected>
                Ocupado
              </option>,
              <option value="disponível">Disponível</option>,
              <option value="manutenção">Manutenção</option>,
            ]);
          } else {
            setSelect([
              <option value="manutenção" selected>
                Manutenção
              </option>,
              <option value="disponível">Disponível</option>,
              <option value="ocupado">Ocupado</option>,
            ]);
          }
        }
      }
    }
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

  async function editIpad() {
    setLoading(true);

    try {
      const { url, options } = IPAD_EDIT(token, ipadid, {
        nome: nome,
        numero_de_serie: serial,
        status_do_ipad: status,
        responsavel: responsavel,
        turma: turma,
        serie: serie,
      });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Usuário não possui permissão");
      const json = await response.json();
      setIpad(json);
      setModal(true);
      console.log(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    getIpads();
    getUsers();
  }, [modal]);

  return (
    <>
      <div className="ipads-header row d-flex justify-content-between">
        <div className="col-md-12">
          <h1 className="title"> {ipad && ipad.nome} </h1>
          <p>
            Altere os dados do Ipad: <strong>{ipad && ipad.nome}</strong>
          </p>
        </div>
      </div>

      <div className="divisor-azul"></div>

      <div className="animeLeft">
        <form className="formField" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <Input
                type="text"
                label="Nome"
                id="nome"
                value={nome}
                placeholder={ipad && ipad.nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                type="text"
                placeholder={ipad && ipad.numero_de_serie}
                label="Número de Série"
                value={serial}
                id="serial"
                onChange={(e) => setSerial(e.target.value)}
              />

              <Select
                label="Status"
                id="status"
                value={status}
                onChange={function (e) {
                  setStatus(e.target.value);
                  if (e.target.value === "disponível") {
                    setResponsavel("Nenhum");
                    setTurma("Nenhum");
                    setSerie("Nenhum");
                  }
                }}
              >
                {select}
              </Select>
            </div>

            <div className="col-md-6">
              <Select
                label="Responsavel"
                id="responsavel"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
              >
                <option value="Nenhum">Nenhum</option>
                <option selected disabled value={ipad && ipad.responsavel}>
                  {" "}
                  {ipad && ipad.responsavel}{" "}
                </option>
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
                placeholder={ipad && ipad.turma}
                label="Turma"
                id="turma"
                value={turma}
                onChange={(e) => setTurma(e.target.value)}
              />
              <Input
                type="serie"
                value={serie}
                placeholder={ipad && ipad.serie}
                label="Série"
                id="serie"
                onChange={(e) => setSerie(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Link to="/painel/ipads" className="btn btn-light">
              Cancelar
            </Link>
            {loading ? (
              <Button>Atualizando...</Button>
            ) : (
              <Button>Salvar alterações</Button>
            )}
          </div>
        </form>
        {error && <p className="error">{error}</p>}
        <Modal
          onClick={handleClick}
          title="Ipad Atualizado"
          text="As informações foram salvas no sistema."
        >
          Confirmar
        </Modal>
      </div>
    </>
  );
}
