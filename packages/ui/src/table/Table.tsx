import "./table.css";
import { isFunction } from "@flowfixe/common";
import React, { useRef, useMemo } from "react";
import TableHandler from "./TableHandler";
import {
  type TableProps,
  type TableColumnProps,
  type Column,
  type Cell,
  type TableRowData,
} from "./TableProps";
import { ResizeCalculator, toInteger } from "@flowfixe/common";
import { TableLoadingCells } from "./TableLoadingData";

const Table = ({
  data = [],
  children,
  rowSeparator = false,
  columSeparator = false,
  freezeHeader = false,
  freezeFooter = false,
  freezeFirstColumn = false,
  fillRemaingSpace = false,
  loadingData = false,
}: TableProps) => {
  const LOADING_NUM_ROWS = 20;
  const tableRef = useRef<HTMLDivElement>(null);

  const toCell = (el: any): Cell =>
    (isFunction(el) ? el : (_: any) => el) as Cell;

  const toColumn = (
    columnEl: React.ReactElement<TableColumnProps>
  ): Column | undefined => {
    const displayName = (columnEl as any)?.type?.displayName;
    if (displayName !== "TableColumn") return undefined;
    const width = columnEl.props.width;
    const resizable = columnEl.props.resizable || false;
    const onResize = columnEl.props.onResize;
    let body = undefined;
    let header = undefined;
    let footer = undefined;
    React.Children.forEach(columnEl.props.children, (child: any) => {
      const cellChildName = child.type?.displayName;
      if (cellChildName === "TableCellHeader") {
        header = child.props.children;
      } else if (cellChildName === "TableCellFooter")
        footer = child.props.children;
      else if (cellChildName === "TableCell") {
        body = toCell(child.props.children) as any;
      }
    });
    return {
      width,
      header,
      footer,
      body,
      resizable,
      onResize,
    };
  };
  const columns = useMemo<Column[]>(() => React.Children.map(children, (child) => toColumn(child)), [children]);
  const handler = new TableHandler(data, columns);
  const loadingNumCells = (handler.columns.length || 1) * LOADING_NUM_ROWS;

  const ensureFixedColumnsSize = (container: HTMLElement) => {
    const columnEls = Array.from(
      container.querySelectorAll(":scope > div[role=columnheader]")
    ) as HTMLElement[];
    columnEls.forEach((el) => {
      const index = toInteger(el.getAttribute("data-index"));
      index !== null && handler.setColumnWidth(el.offsetWidth, index);
    });
    container.style.gridTemplateColumns = handler.getTableTemplateColumns();
  };

  const resizeColumn = (
    e: React.MouseEvent<HTMLDivElement>,
    column: Column,
    columnIndex: number
  ) => {
    const container = tableRef.current;
    const target = (e.target as HTMLDivElement)?.parentElement;
    if (!target || !container) return;
    container.classList.add("resizing");
    ensureFixedColumnsSize(container);
    const resizer = new ResizeCalculator(target as HTMLElement)
      .onResize(({ width }) => {
        handler.setColumnWidth(width, columnIndex);
        container.style.gridTemplateColumns = handler.getTableTemplateColumns();
      })
      .onStop(({ width }) => {
        container.classList.remove("resizing");
        column.onResize?.(width);
      });
    resizer.initResize(e);
  };

  const renderRow = (row: TableRowData, rowIndex: number) => {
    if (!row.___ref___) {
      row.___ref___ = crypto.randomUUID();
    }
    return (
      <>
        {handler.columns.map((column, columnIndex) => (
          <div
            key={`${row.___ref___}-${columnIndex}`}
            className={handler.getCellClass(columnIndex, freezeFirstColumn)}
            role="cell"
          >
            {column.body && column.body({ row, rowIndex, columnIndex })}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className={`ff-table-wrapper ${loadingData ? "loading" : ""}`}>
      <div className="ff-table-container">
        <div
          ref={tableRef}
          className={handler.getTableClass(
            rowSeparator,
            columSeparator,
            freezeHeader,
            freezeFooter
          )}
          style={handler.getTableStyle(
            !loadingData ? data.length : LOADING_NUM_ROWS,
            fillRemaingSpace
          )}
          role="table"
        >
          {handler.hasHeader() &&
            handler.columns.map((column, i) => (
              <div
                className={handler.getHeaderCellClass(i, freezeFirstColumn)}
                key={`h${i}`}
                role="columnheader"
                data-index={i}
              >
                {column.header}
                {column.resizable && (
                  <div
                    className="ff-table-column-resizer"
                    onMouseDown={(e) => resizeColumn(e, column, i)}
                  ></div>
                )}
              </div>
            ))}
          {handler &&
            !loadingData &&
            data.map(renderRow)}
          {loadingData && <TableLoadingCells numCells={loadingNumCells} />}
          <div className="ff-table-fill-remaining"></div>
          {handler.hasFooter() &&
            handler.columns.map((column, i) => (
              <div
                className={handler.getFooterCellClass(i, freezeFirstColumn)}
                key={`f${i}`}
                role="cell"
              >
                {column.footer}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
