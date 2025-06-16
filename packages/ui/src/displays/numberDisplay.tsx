import { NumberFormatter } from "@flowfixe/common";

export type NumberDisplayProps = {
  value: number;
  integer?: boolean;
  thousandsSeparator?: string;
  decimalSeparator?: string;
  decimalNumDigits?: number;
  prefix?: string;
  suffix?: string;
};

export const NumberDisplay = ({
  value,
  integer = false,
  thousandsSeparator = ",",
  decimalSeparator = ".",
  decimalNumDigits = 2,
  prefix = "",
  suffix = "",
}: NumberDisplayProps) => {
  const formatted = new NumberFormatter()
    .withThousandsSeparator(thousandsSeparator)
    .withDecimalSeparator(decimalSeparator)
    .withDecimalNumDigits(decimalNumDigits)
    .withPrefix(prefix)
    .withSuffix(suffix)
    .asInteger(integer)
    .format(value);
  return (
    <div className="ff-value-display" title={formatted}>
      <span className="ff-text-truncate">{formatted}</span>
    </div>
  );
};
