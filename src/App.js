import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Painel from "./Pages/Painel";
import { UserStorage } from "./UserContext";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/materiais">
        <UserStorage>
          <Routes>
            <Route path="/painel/*" element={<Painel />} />
            <Route path="/" element={<Login />} />
            <Route path="/login/*" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
