import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Painel from "./Pages/Painel";
import { UserStorage } from "./UserContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route exact path="/painel/*" element={<Painel />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login/*" element={<Login />} />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
