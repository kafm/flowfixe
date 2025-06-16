export type CellProps = {
  row: any;
  rowIndex: number;
  columnIndex: number;
}

export type Cell = ((props: CellProps) => React.ReactNode) | undefined

export interface Column {
  freeze?: boolean;
  onResize?: (width: number) => any
  width: number | undefined;
  resizable:boolean;
  header: React.ReactNode; 
  body: Cell;
  footer: React.ReactNode;
}

export interface TableCellHeaderProps {
  header?: true;
  children?: React.ReactNode;
}

export interface TableCellFooterProps {
  footer?: true;
  children?: React.ReactNode;
}

export interface TableCellProps {
  children: any;
}

export type TableColumnCellProps =
  | TableCellProps
  | TableCellFooterProps
  | TableCellHeaderProps;

export interface TableColumnProps {
  key?: any
  children:
    | React.ReactElement<TableColumnCellProps>
    | React.ReactElement<TableColumnCellProps>[];
  width?: number;
  resizable?:boolean;
  onResize?: (width: number) => any
}

export const TableCell: React.FC<TableCellProps> = (_: TableCellProps) => null

export const TableCellHeader: React.FC<TableCellHeaderProps> = (_: TableCellHeaderProps) => null

export const TableCellFooter: React.FC<TableCellFooterProps> = (_: TableCellFooterProps) => null

export const TableColumn: React.FC<TableColumnProps> = (_: TableColumnProps) => null

TableColumn.displayName = "TableColumn";
TableCellFooter.displayName = "TableCellFooter";
TableCellHeader.displayName = "TableCellHeader";
TableCell.displayName = "TableCell";

export interface TableProps {
  data?: object[];
  columSeparator?: boolean;
  rowSeparator?: boolean;
  freezeFirstColumn?: boolean;
  freezeHeader?: boolean;
  freezeFooter?: boolean;
  fillRemaingSpace?: boolean;
  loadingData?: boolean;
  children:any;
}