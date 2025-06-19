import "../fields.css";
import "./autocomplete.css";
import { isEmpty, defaultTo } from "@flowfixe/common";
import { StringField, validateField } from "@flowfixe/common";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  type FieldProps,
  type FieldState,
  getInitialValidState,
  getValidState,
  getErrorState,
  renderLabel,
  renderErrors,
  renderErrorsInline,
} from "../helpers";
import {
  type AutocompleteActionProps,
  AutocompleteAction,
} from "./AutocompleteAction";
import {
  type AutocompleteOptionProps,
  AutocompleteOption
} from "./AutocompleteOption";
import {
  type ErrorCallback,
  type AsyncFilter,
  type AllowedChildren,
  splitActionsAndProps,
  getColor,
  getAvatar,
} from "./AutocompleteHelper";
import AutocompleteHandler from "./AutocompleteHandler";
import { XLg, ChevronDown } from "../../icons";
import { useFormValue } from "../../form";

export interface AutocompleteChangeState extends FieldState<string | null> {
  color?: React.ReactElement;
  avatar?: React.ReactElement;
}

export interface AutocompleteProps extends FieldProps<string> {
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  width?: string;
  inline?: boolean;
  debounceTimeout?: number;
  children?: AllowedChildren | AllowedChildren[];
  onFilter?: AsyncFilter;
  onError?: ErrorCallback;
}

export const Autocomplete = ({
  name,
  label,
  aid,
  value = "",
  placeholder,
  width = "100%",
  required = false,
  readOnly = false,
  autoFocus = false,
  inline = false,
  debounceTimeout = 100,
  children,
  onChange,
  onFilter,
  onError,
}: AutocompleteProps) => {
  const [, setFormValue] = useFormValue(name, value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<AutocompleteChangeState>(
    getInitialValidState(value || null)
  );
  const [options, setOptions] = useState<AutocompleteOptionProps[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  const setMenuWidth = () => {
    const menu = menuRef?.current;
    const rect = menu?.parentElement?.getBoundingClientRect();
    if (menu && rect) {
      menu.style.cssText = `
      min-width: ${rect.width}px;
      top: calc(${rect.height}px + .25em);
      left: 0;`;
    }
  };

  const hideOptions = () =>
    containerRef.current?.classList.remove("ff-expanded");

  const showOptions = () => {
    setMenuWidth();
    containerRef.current?.classList.add("ff-expanded");
  };

  const setInputValue = (
    value: string | null | undefined,
    blurAfter: boolean = false
  ) => {
    if (inputRef.current) {
      inputRef.current.value = value || "";
    }
    blurAfter && inputRef.current?.blur();
  };

  const applySelection = (
    selection: AutocompleteOptionProps | null,
    newState: AutocompleteChangeState = state
  ) => {
    setInputValue(selection?.value);
    setState({
      ...newState,
      color: selection ? getColor(selection) : undefined,
      avatar: selection ? getAvatar(selection) : undefined,
    });
    hideOptions();
  };

  const toHandleChange = (newValue: string | undefined | null): boolean =>
    !readOnly && (newValue !== state.value || !newValue);

  const getInputValue = (): string | null => {
    const selectedValue = handler.selected?.value || null;
    return selectedValue === defaultTo(inputRef.current?.value, null)
      ? selectedValue
      : null;
  };

  const handleBlur = () => {
    const newValue = getInputValue();
    const selected = newValue ? handler.selected : null;
    if (!toHandleChange(newValue)) return;
    const validation = validateField<string>(
      StringField.of(name, label).required(required).value(newValue)
    );
    const newState = validation.caseOf(
      (errors) => getErrorState(errors, state.value),
      (newValue) => getValidState(newValue, state.value)
    ) as AutocompleteChangeState;
    setFormValue(selected?.value!);
    onChange && onChange({ ...newState });
    applySelection(selected, newState);
  };

  const performAction = (action: AutocompleteActionProps) => {
    hideOptions();
    inputRef.current?.blur();
    setTimeout(action.onClick);
  };

  const { handler, actions } = useMemo<{
    handler: AutocompleteHandler;
    actions: AutocompleteActionProps[];
  }>(() => {
    const { options, actions } = splitActionsAndProps(children || []);
    const handler = new AutocompleteHandler({
      debounceTimeout,
      options,
      onFilter,
    });
    handler
      .setSelectedFromValue(value)
      .onFocus(showOptions)
      .onBlur(handleBlur)
      .onSelect((option, fromReset) => setInputValue(option?.value, !fromReset))
      .onCancel(() => setInputValue(handler.selected?.value, true))
      .onFilter(setOptions)
      .onFetching(setFetching)
      .onError(onError);
    return { handler, actions };
  }, []);

  useEffect(() => {
    setOptions(handler.options);
    applySelection(handler.selected);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`ff-field-container ff-autocomplete${
        readOnly ? " ff-read-only" : ""
      }${inline ? " ff-field-inline" : ""}`}
      style={{ width }}
      role="list"
    >
      {!inline && renderLabel(label, aid, required)}
      <div
        className={`ff-field-value${!state.isValid ? " ff-error" : ""}`}
        aria-haspopup="listbox"
      >
        {state.avatar}
        {state.color}
        <input
          ref={inputRef}
          type="text"
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          required={!readOnly && required}
          onKeyUp={(e) => handler?.handleKeypress(e)}
          onFocus={() => handler?.handleFocus()}
          onBlur={() => handler?.handleBlur()}
          autoFocus={autoFocus}
        />
        {fetching}
        {fetching && (
          <div
            className="ff-toggle-options"
            style={{ color: "var(--ff-bg-primary)" }}
            aria-busy="true"
          ></div>
        )}
        {!fetching && (
          <div className="ff-toggle-options">
            <div
              className="ff-autocomplete-reset"
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={() => handler?.handleReset()}
            >
              <XLg />
            </div>
            <div
              className="ff-autocomplete-show-menu"
              onClick={() => inputRef.current?.focus()}
            >
              <ChevronDown />
            </div>
          </div>
        )}
        {inline && renderErrorsInline(state.errors)}
      </div>
      <ul ref={menuRef} role="listbox" className="ff-options-menu">
        {options.map((props) => (
          <AutocompleteOption
            {...props}
            key={props.value}
            onSelect={(option) => handler?.setSelected(option)}
          />
        ))}
        {!isEmpty(actions) && (
          <li
            className="ff-autocomplete-actions"
            style={
              isEmpty(options) ? { borderTop: 0, marginTop: 0 } : undefined
            }
          >
            <div>
              {actions.map((props, i) => (
                <AutocompleteAction
                  {...props}
                  onClick={() => performAction(props)}
                  key={i}
                />
              ))}
            </div>
          </li>
        )}
      </ul>
      {!inline && renderErrors(state.errors)}
    </div>
  );
};
