export type LinkDisplayProps = {
  value: string;
  href?: string;
  onClick?: () => any;
};

export const LinkDisplay = ({
  value,
  href,
  onClick,
}: LinkDisplayProps) =>
  value && (
    <div
      className="ff-value-display ff-link-display"
      onClick={() => onClick?.()}
      title={value}
    >
      {href ? (
        <a href={href} className="ff-text-truncate" target="_blank">
          {value}
        </a>
      ) : (
        <span className="ff-text-truncate">{value}</span>
      )}
    </div>
  );
