import React from "react";

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  bordered?: boolean;
}

const FormSection = ({
  title,
  bordered = true,
  children,
}: FormSectionProps) => {
  return (
    <div className="ff-form-section" style={!bordered ? { border: 0 } : {}}>
      {title && <h3>{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

export default FormSection;
