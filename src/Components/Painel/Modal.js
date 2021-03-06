import React from "react";
import Button from "../Forms/Button";
import "./Modal.css";
import { UserContext } from "../../UserContext";
import { useLocation } from "react-router-dom";

export default function Modal({ children, onClick, text, title }) {
  const { modal, setModal } = React.useContext(UserContext);
  const [disabled, setDisabled] = React.useState(false);
  const location = useLocation();

  function checkUrl() {
    if (
      location.pathname === "/painel/usuarios" ||
      location.pathname === "/painel/ipads"
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  React.useEffect(() => {
    checkUrl();
  }, []);

  return (
    <>
      {modal && (
        <div
          className="fade modal"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="title"> {title} </h5>
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={(e) => setModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="text">{text}</p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                {disabled ? (
                  [
                    <Button
                      className="btn btn-light"
                      onClick={(e) => setModal(false)}
                    >
                      Cancelar
                    </Button>,
                    <Button onClick={onClick}> {children} </Button>,
                  ]
                ) : (
                  <Button onClick={onClick}> {children} </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
