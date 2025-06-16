import _Form, { type FormProps } from "./Form";
import FormSection, { type FormSectionProps } from "./FormSection";
import FormList, { type FormListProps } from "./FormList";
import FormInput, { type FormInputProps } from "./FormInput";
import FormAction, { type FormActionProps } from "./FormAction";

type FormCollection = typeof _Form & {
  Section: typeof FormSection;
  List: typeof FormList;
  Input: typeof FormInput;
  Action: typeof FormAction;
};

const Form = _Form as FormCollection;
Form.Section = FormSection;
Form.List = FormList;
Form.Input = FormInput;
Form.Action = FormAction;

export {
  type FormProps,
  type FormSectionProps,
  type FormListProps,
  type FormInputProps,
  type FormActionProps,
};

export { type FormValues, useFormContext, useFormValue } from "./FormContext";

export default Form;
