import React from "react";
import { TOKEN_POST, USER_GET, TOKEN_VALIDATE_POST } from "./api";
import { useNavigate } from "react-router-dom";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState([]);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");

  React.useEffect(() => {
    async function autoLogin() {
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido!");
          await getUser(token);
          navigate("/painel");
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Senha ou usuário incorretos.");
      const { data } = await response.json();
      localStorage.setItem("Token", data.token);
      await getUser(data.token);
      navigate("/painel");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  async function userLogout() {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    localStorage.removeItem("Token");
    navigate("/");
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        getUser,
        username: "marcus",
        data,
        token,
        userLogout,
        error,
        loading,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
