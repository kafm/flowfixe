import _Table from "./Table";
import {
  TableColumn,
  TableCellHeader,
  TableCellFooter,
  TableCell,
  type TableProps,
  type TableColumnProps,
  type TableCellProps,
  type TableCellHeaderProps,
  type TableCellFooterProps,
} from "./TableProps";

type TableCollection = typeof _Table & {
  Column: typeof TableColumn;
  CellHeader: typeof TableCellHeader;
  CellFooter: typeof TableCellFooter;
  Cell: typeof TableCell;
};

const Table = _Table as TableCollection;
Table.Column = TableColumn;
Table.CellHeader = TableCellHeader;
Table.CellFooter = TableCellFooter;
Table.Cell = TableCell;

export {
  type TableProps,
  type TableColumnProps,
  type TableCellProps,
  type TableCellHeaderProps,
  type TableCellFooterProps,
};

export default Table;
