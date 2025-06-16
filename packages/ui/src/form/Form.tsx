import React, {useMemo, useRef} from "react";
import { isNil, isEqual, toLower } from "@flowfixe/common";
import { type FormValues, FormContext, FormHandler } from "./FormContext";

export interface FormProps {
  /** The name of the form */
  name?: string;
  autoComplete?: boolean;
  action?: string;
  method?: string;
  onChange?: (data: FormValues) => any;
  onSubmit?: (data: FormValues) => any;
  children: any
}

/** A Form is very important! */
const Form = ({
  name,
  action,
  autoComplete = false,
  method = "get",
  children,
  onChange,
  onSubmit,
}: FormProps) => {
  const ajaxSubmission = isNil(action);
  const  formRef = useRef<HTMLFormElement>(null);
  const formHandler = useMemo(() => {
    const handler = new FormHandler();
    handler.onChange((data) => onChange?.(data));
    return handler;
  }, [name]);

  const blurAll = () => {
      formRef.current?.querySelectorAll('input,textarea').forEach((element) => {
          if(element === document.activeElement) {
              return (element as HTMLElement)?.blur();
          }
      });
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    ajaxSubmission && e.preventDefault();
    blurAll();
    return onSubmit?.(formHandler.getDate());
  };

  return (
    <FormContext.Provider value={formHandler}>
      <form
        ref={formRef}
        name={name}
        autoComplete={autoComplete ? "on" : "off"}
        className="ff-form"
        action={action}
        method={isEqual(toLower(method), "post") ? "POST" : "GET"}
        onSubmit={(e) => handleSubmit(e)}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
