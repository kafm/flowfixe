import { extend } from "@flowfixe/common";

export type BadgeDisplayProps = { value: string; color?: string }; //TODO add support for links conversion

export const BadgeDisplay = ({ value, color }: BadgeDisplayProps) => {
  const style: any = {};
  color && extend(style, { "--ff-display-badge-color": color });

  return (
    value && (
      <span
        className="ff-text-truncate ff-value-display ff-badge-display"
        title={value}
        style={style as React.CSSProperties}
      >
        {value}
      </span>
    )
  );
};
