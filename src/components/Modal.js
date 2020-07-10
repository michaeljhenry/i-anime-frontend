import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';
import {CSSTransition} from 'react-transition-group';

const ModalCard = (props) => {
    return ReactDOM.createPortal(
        <div className = 'modal-box'>
            <div className = 'modal-card'>
                <div className = 'modal-header'><h3>An Error Has Occured</h3></div>
                <div className = 'modal-body__container'>
                  <div className = 'modal-body'><p>{props.children}</p></div>
              </div>
              <div className = 'modal-footer__container'>
                <div className = 'modal-footer'>Error Status: 404</div>
              </div>
            </div>
            
        </div>, document.getElementById('modal-hook')
    )
};

const Modal = props => {
    console.log(props.show);
    return (
      <React.Fragment>
        {props.show && <Backdrop colour = 'dark' onClick={props.onCancel} />}
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

