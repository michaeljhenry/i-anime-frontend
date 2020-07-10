import React from 'react';
import Modal from './Modal';

const ErrorModal = (props) => {
    return(
        <Modal show = {props.show} onCancel = {props.onCancel} header = {<p>An Error Has Occured</p>} footer = {`Status Code: ${props.error.status}`}>
            {props.error.message}
        </Modal>
    )
};

export default ErrorModal;