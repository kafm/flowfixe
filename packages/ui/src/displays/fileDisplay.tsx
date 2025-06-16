import { Download } from "../icons";

export type FileProps = { id: string; name?: string };
export type FileDisplayProps = {
  value: string;
  href?: string;
  onClick?: (props: FileProps) => any;
};

export const FileDisplay = ({ value, href, onClick }: FileDisplayProps) => {
  const parts = value?.split("±");
  const props: FileProps = { id: value };
  if (parts?.length > 0) {
    props.id = parts[0] as string;
    props.name = parts.length > 1 ? parts[1] : parts[0];
  }
  return (
    value && (
      <div
        className="ff-value-display ff-file-display"
        onClick={() => onClick?.(props)}
        title={props.name}
      >
        {href ? (
          <a href={href} className="ff-text-truncate" target="_blank">
            {value}
          </a>
        ) : (
          <span className="ff-text-truncate">{props.name}</span>
        )}
        <Download />
      </div>
    )
  );
};
