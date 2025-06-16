import React from "react";

export interface FormActionProps {
  children: React.ReactNode;
}

const FormAction = ({ children }: FormActionProps) => {
  return <div className="ff-form-action">{children}</div>;
};

export default FormAction;
