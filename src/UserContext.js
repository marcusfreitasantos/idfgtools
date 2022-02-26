import React from "react";
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from "./api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginRedux } from "./Features/User";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const [modal, setModal] = React.useState(false);
  const dispatch = useDispatch();

  const token = localStorage.getItem("Token");

  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      localStorage.removeItem("Token");
      navigate("/login");
    },

    [navigate]
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
    dispatch(
      userLoginRedux({
        nome: json.nome,
        sobrenome: json.sobrenome,
        email: json.email,
        funcao: json.role,
        setor: json.setor,
      })
    );
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
      const { data } = await response.json();
      localStorage.setItem("Token", data.token);
      await getUser(data.token);
      //navigate("/painel");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      if (token) {
        console.log(token);
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          const json = await response.json();
          if (!response.status === 403) {
            userLogout();
            console.log(json.message);
            throw new Error(json.message);
          } else {
            await getUser(token);
            //navigate("/painel");
          }
        } catch (err) {
          setError(err);
          userLogout();
        } finally {
          setLoading(false);
          console.log("finaly", error);
        }
      }
    }
    autoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        getUser,
        data,
        token,
        userLogout,
        error,
        loading,
        login,
        modal,
        setModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
