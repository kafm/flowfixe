export interface FormInputProps {
  width?: string;
  hidden?: boolean;
  children: any;
}

const FormInput = ({ width, hidden, children }: FormInputProps) => {
  const style = width ? { width } : {};

  return (
    <div className={`ff-form-input ${hidden ? "hide" : ""}`} style={style}>
      {children}
    </div>
  );
};

export default FormInput;
