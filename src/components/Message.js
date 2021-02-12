import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children, className }) => {
  return (
    <Alert className={className ? className : null} variant={variant}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};
export default Message;
