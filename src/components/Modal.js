import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

const ModalCard = (props) => {
  return ReactDOM.createPortal(
    <div className={props.form ? "modal-box__form" : "modal-box"}>
      <div className="modal-card">
        <div className="modal-header">
          <h3>{props.header}</h3>
        </div>
        <div className="modal-body__container">
          <div className="modal-body">{props.children}</div>
        </div>
        <div className="modal-footer__container">
          <div className="modal-footer">
            <button onClick={props.onCancel}>Close</button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-hook")
  );
};

const Modal = (props) => {
  //console.log(props.show);
  return (
    <React.Fragment>
      {props.show && <Backdrop colour="dark" onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal-card"
      >
        <ModalCard {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
