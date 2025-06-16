export type PrimaryDisplayProps = { children: any, onClick?: () => any };

export const PrimaryDisplay = ({ children, onClick }: PrimaryDisplayProps) => (
  <div className="ff-primary-display-container" role="button" tabIndex={0} onClick={onClick}>
    {children}
  </div>
);
