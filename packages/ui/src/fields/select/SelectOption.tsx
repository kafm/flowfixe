export interface SelectOptionProps {
  value: string;
  label?: string;
  selected?: boolean;
  disabled?: boolean;
}

export const SelectOption = (props: SelectOptionProps) => {
  const { value, label, selected = false, disabled = false } = props;

  return (
    <option value={value} selected={selected} disabled={disabled}>
      {label || value}
    </option>
  );
};
