export type TextDisplayProps = { value: string, strong?:boolean }; //TODO add support for links conversion

export const TextDisplay = ({ value, strong }: TextDisplayProps) => (
  <div className="ff-value-display" title={value}>
    {strong ? <strong className="ff-text-truncate">{value}</strong> : <span className="ff-text-truncate">{value}</span>}
  </div>
);
