import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ImageUpload from "./ImageUpload";
import { useHttpClient } from "../hooks/http-hook";
import Message from "../components/Message";
import LoaderSpinner from "../components/Loader";

const EditProfileModal = (props) => {
  const [image, setImage] = useState("");
  const { isLoading, error, sendRequest } = useHttpClient();
  console.log(props.image);
  const onImageUpload = (data, fileIsValid) => {
    if (fileIsValid) {
      const imagePicked = [data];
      setImage(imagePicked[0]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const oldImageData = {
      oldImage: props.oldImage,
    };
    const userInfo = new FormData();
    userInfo.append("image", image);
    userInfo.append("creator", props.userId); // this is the key fileUpload.single('image') is looking for in our backend
    for (var pair of userInfo.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      await Promise.all([
        sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/users/fileDelete`,
          "DELETE",
          JSON.stringify(oldImageData),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + props.token,
          }
        ),
        sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/users/newUpload`,
          "POST",
          userInfo
        ),
      ]);
      setImage("");
      props.onCloseHandler();
      window.parent.location = window.parent.location.href; // page refresh
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <React.Fragment>
      {isLoading && <LoaderSpinner />}
      {!isLoading && (
        <Modal
          className="editmodal"
          show={props.show}
          onHide={props.onCloseHandler}
        >
          <Modal.Header className="editmodal--header" closeButton>
            <Modal.Title>Profile Picture</Modal.Title>
            {error && <Message variant="danger">{error.message}</Message>}
          </Modal.Header>
          <Form onSubmit={onSubmitHandler}>
            <ImageUpload onImageUpload={onImageUpload} />
            <Modal.Footer className="editmodal--footer">
              <Button disabled={!image} type="submit" variant="primary">
                Save Changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={props.onCloseHandler}
              >
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default EditProfileModal;
