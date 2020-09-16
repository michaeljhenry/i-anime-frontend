import React from "react";
import Modal from "./Modal";

const ErrorModal = (props) => {
  return (
    <Modal
      show={props.show}
      onCancel={props.onCancel}
      header={<p>An Error Has Occured</p>}
    >
      {props.error.message}
    </Modal>
  );
};

export default ErrorModal;
