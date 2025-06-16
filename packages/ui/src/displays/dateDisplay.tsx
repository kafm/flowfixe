import { formatDate } from "@flowfixe/common";

export type DateDisplayProps = {
  value: any;
  dateFormat?: string;
  timeFormat?: string;
};

export const DateDisplay = ({
  value,
  dateFormat,
  timeFormat,
}: DateDisplayProps) => {
  const format = ((dateFormat || "" ) + (timeFormat || "")) || undefined;
  const dateValue = value ? formatDate(value, format) : undefined;
  return <div className="ff-value-display" title={dateValue!}><span className="ff-text-truncate">{dateValue}</span></div>;
};
