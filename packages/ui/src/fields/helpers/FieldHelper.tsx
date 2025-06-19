import { isEmpty, includes } from "@flowfixe/common";
import { ExclamationTriangle } from "../../icons";

export const getColor = (color: string): string => {
  if (
    includes(
      ["primary", "danger", "muted", "warning", "success", "dark", "light"],
      color
    )
  ) {
    return `var(--ff-bg-${color})`;
  }
  return color;
};


export const renderLabel = (label: string | undefined, aid: string | undefined, required: boolean) => (
  <div className="ff-field-label">
    {label && (
      <label>
        {label} {required && <small className="ff-required">*</small>}
      </label>
    )}
    {aid && (
      <div className="ff-aid">
        <small>{aid || ""}</small>
      </div>
    )}
  </div>
);

export const renderErrors = (errors: string[]) =>
  errors.map((error, i) => (
    <small key={`error${i}`} className="ff-error">
      {error}
    </small>
  ));

export const renderErrorsInline = (errors: string[]) => (
  <div
    className={`ff-error-indicator${isEmpty(errors) ? "" : " show"}`}
    data-tooltip={errors.join("\n")}
    data-placement="bottom"
  >
    <div>
      <ExclamationTriangle />
    </div>
  </div>
);
