import React from "react";

const Form = ({ children, ...rest }) => {
  return <form {...rest}>{children}</form>;
};

export default Form;
