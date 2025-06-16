import { type Column } from "./TableProps";

export default class TableHandler {
  columns: Column[] = [];
  dataCount: number = 0;
  defaultWidth: string = "unset";
  lastColumnIndex = 0;
  displayHeader: boolean = false;
  displayFooter: boolean = false;

  constructor(readonly data: object[]) {
    this.dataCount = data.length;
  }

  addColumn(column?: Column) {
    if (!column) return;
    this.lastColumnIndex = this.columns.length;
    this.columns.push(column);
    this.displayHeader = column.header !== undefined || this.displayHeader;
    this.displayFooter = column.footer !== undefined || this.displayFooter;
    //check if it has headers or not
    //if(column.footer) TODO check if it has footer or not
  }

  setColumnWidth(width: number, index: number) {
    if (index >= 0 && index < this.columns.length) {
      this.columns[index].width = width;
    }
  }

  getRowCount(): number {
    return this.dataCount;
  }

  getColumnCount(): number {
    return this.columns.length;
  }

  getColumnAtIndex(index: number): Column {
    return this.columns[index];
  }

  getTableClass(
    rowSeparator: boolean,
    columSeparator: boolean,
    freezeHeader: boolean,
    freezeFooter: boolean
  ): string {
    const classes = ["ff-table"];
    rowSeparator && classes.push("ff-table-row-separator");
    columSeparator && classes.push("ff-table-column-separator");
    freezeHeader && classes.push("ff-table-freeze-header");
    freezeFooter && classes.push("ff-table-freeze-footer");
    return classes.join(" ");
  }

  getTableStyle(
    numRows: number,
    fillRemaingSpace?: boolean
  ): React.CSSProperties {
    return {
      gridTemplateColumns: this.getTableTemplateColumns(),
      gridTemplateRows: this.getTableTemplateRows(numRows, fillRemaingSpace),
    } as React.CSSProperties;
  }

  getTableTemplateRows(numRows: number, fillRemaingSpace?: boolean): string {
    const repeatCount = (this.displayHeader ? 1 : 0) + numRows;
    const style = repeatCount > 0 ? [`repeat(${repeatCount}, max-content)`] : []
    fillRemaingSpace && style.push(`auto`);
    this.displayFooter && style.push("max-content");
    return style.join(" ");
  }

  getTableTemplateColumns(): string {
    return this.columns
      .map((column) =>
        column.width
          ? `${column.width}px`
          : "minmax(var(--ff-default-table-cell-size), 1fr)"
      )
      .join(" ");
  }

  getHeaderCellClass(columnIndex: number, freezeFirstColumn: boolean): string {
    const classes = ["ff-table-header-cell"];
    return this.getCellClass(columnIndex, freezeFirstColumn, classes);
  }

  getFooterCellClass(columnIndex: number, freezeFirstColumn: boolean): string {
    const classes = ["ff-table-footer-cell"];
    return this.getCellClass(columnIndex, freezeFirstColumn, classes);
  }

  getCellClass(
    columnIndex: number,
    freezeFirstColumn: boolean,
    classes: string[] = []
  ): string {
    columnIndex === this.lastColumnIndex &&
      classes.push("ff-table-row-last-cell");
    freezeFirstColumn &&
      columnIndex === 0 &&
      classes.push("ff-table-primary-cell");
    return classes.join(" ");
  }

  getColumnWidth(index: number): number | string {
    return this.columns[index].width || this.defaultWidth;
  }

  hasHeader(): boolean {
    return this.displayHeader;
  }

  hasFooter(): boolean {
    return this.displayFooter;
  }
}
