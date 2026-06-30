import { Text } from "@/components/common/Text";
import { BodyCell, BodyRow, GridTable, GridTbody, GridThead, HeaderCell, HeaderRow, LoaderOverlay, TableScrollArea } from "@/components/common/Table/TableStyle";
import { ShowingRecord } from "@/components/common/Table/ShowingReacord";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAvailableHeight } from "@/hooks/useAvailableHeight";
import CCTableColumnVisibilityMenu from "@/components/common/Table/TableColumnVisibilityMenu";

export const ROW_HEIGHT_PX = 46;
export interface TableColumn<T> {
  key: string;
  name: string | React.ReactNode;
  minWidth?: string;
  flexGrow?: string;
  havePermission?: boolean;
  render?: (row: T, index: number) => React.ReactNode;
  onCellClick?: (row: T, index: number, e: React.MouseEvent) => void;
  className?: string;
  textAlign?: string;
  /** Skip Text wrapper — use for inputs, switches, buttons */
  rawCell?: boolean;
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  getRowKey?: (row: T, index: number) => string | number;
  getRowClassName?: (row: T, index: number) => string | undefined;
  activeRowKey?: string | number | null;
  rowHeightPx?: number;
}

interface TableProps<T> {
  config: TableConfig<T>;
  data: T[];
  isLoading?: boolean;
  tableRef?: React.RefObject<HTMLDivElement>;
  emptyMessage?: string;
  paginationProps?: {
    total: number;
    page: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    setRowsPerPageStatic: (pageSize: number) => void;
  } | null;
  hideShowColumnMenu?: boolean;
  isDraggable?: boolean;
  textAlign?: string;
  rowHeightPx?: number;
}
const Table = <T,>({
  config,
  data,
  isLoading,
  tableRef,
  emptyMessage = "No Data Found",
  paginationProps = null,
  hideShowColumnMenu = true,
  isDraggable = true,
  rowHeightPx,
}: TableProps<T>) => {
  const bottomBarRef = useRef<HTMLDivElement | null>(null);
  const draggingColumnKeyRef = useRef<string | null>(null);
  const hasBottomBar = paginationProps !== null;
  const tableContainerHeight = useAvailableHeight(
    tableRef,
    {
      bottomRefs: hasBottomBar ? [bottomBarRef] : [],
      bottomPadding: hasBottomBar ? 0 : 20,
    }
  );


  // 🔥 destructure config here
  const {
    columns,
    onRowClick,
    getRowKey,
    getRowClassName,
    activeRowKey,
    rowHeightPx: configRowHeightPx,
  } = config;
  const resolvedRowHeightPx = rowHeightPx ?? configRowHeightPx ?? ROW_HEIGHT_PX;
  const isFixedColumnKey = (columnKey: string) => {
    const fixedColumns = ["sr_no", "action", "actions"];
    return fixedColumns.includes(columnKey.toLowerCase());
  };

  const permittedColumns = useMemo(
    () => columns.filter((col) => col.havePermission !== false),
    [columns]
  );
  const [columnSequence, setColumnSequence] = useState<string[]>(
    permittedColumns.map((column) => column.key)
  );
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>(
    permittedColumns.map((column) => column.key)
  );

  useEffect(() => {
    const permittedColumnKeys = permittedColumns.map((column) => column.key);

    setColumnSequence((prev) => {
      const stillAvailable = prev.filter((key) => permittedColumnKeys.includes(key));
      const newKeys = permittedColumnKeys.filter((key) => !stillAvailable.includes(key));
      return [...stillAvailable, ...newKeys];
    });

    setVisibleColumnKeys((prev) => {
      const previousVisible = prev.filter((key) =>
        permittedColumnKeys.includes(key)
      );
      const newKeys = permittedColumnKeys.filter(
        (key) => !previousVisible.includes(key)
      );

      return [...previousVisible, ...newKeys];
    });
  }, [permittedColumns]);

  const orderedPermittedColumns = useMemo(
    () =>
      columnSequence
        .map((columnKey) =>
          permittedColumns.find((column) => column.key === columnKey)
        )
        .filter((column): column is TableColumn<T> => Boolean(column)),
    [columnSequence, permittedColumns]
  );

  const visibleColumns = useMemo(
    () =>
      orderedPermittedColumns.filter((column) =>
        isFixedColumnKey(column.key) || visibleColumnKeys.includes(column.key)
      ),
    [orderedPermittedColumns, visibleColumnKeys]
  );
  const bodyHeight = data.length * resolvedRowHeightPx;

  const handleToggleColumn = (columnKey: string, checked: boolean) => {
    if (isFixedColumnKey(columnKey)) {
      return;
    }
    setVisibleColumnKeys((prev) => {
      if (checked) {
        if (prev.includes(columnKey)) {
          return prev;
        }
        return columnSequence.filter((key) => [...prev, columnKey].includes(key));
      }

      const next = prev.filter((key) => key !== columnKey);

      // Keep at least one column visible so table remains usable.
      return next.length > 0 ? next : prev;
    });
  };

  const handleColumnDragStart = (columnKey: string) => {
    if (isFixedColumnKey(columnKey)) {
      draggingColumnKeyRef.current = null;
      return;
    }
    draggingColumnKeyRef.current = columnKey;
  };

  const handleColumnDrop = (targetColumnKey: string) => {
    const sourceColumnKey = draggingColumnKeyRef.current;
    draggingColumnKeyRef.current = null;

    if (!sourceColumnKey || sourceColumnKey === targetColumnKey) {
      return;
    }
    if (isFixedColumnKey(sourceColumnKey) || isFixedColumnKey(targetColumnKey)) {
      return;
    }

    setColumnSequence((prev) => {
      const sourceIndex = prev.indexOf(sourceColumnKey);
      const targetIndex = prev.indexOf(targetColumnKey);

      if (sourceIndex < 0 || targetIndex < 0) {
        return prev;
      }

      const next = [...prev];
      next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, sourceColumnKey);

      return next;
    });
  };

  const columnVisibilityMenu = hideShowColumnMenu ? (
    <CCTableColumnVisibilityMenu
      columns={orderedPermittedColumns.filter((column) => !isFixedColumnKey(column.key))}
      visibleColumnKeys={visibleColumnKeys}
      onToggleColumn={handleToggleColumn}
      onShowAllColumns={() =>
        setVisibleColumnKeys(
          orderedPermittedColumns
            .filter((column) => !isFixedColumnKey(column.key))
            .map((column) => column.key)
        )
      }
    />
  ) : undefined;

  return (
    <>
      <TableScrollArea ref={tableRef} heightPx={tableContainerHeight}>

        {/* 🔹 Loader */}
        {isLoading && (
          <LoaderOverlay>
            <Text fontSize="16px" fontWeight="bold">
              Loading...
            </Text>
          </LoaderOverlay>
        )}

        <GridTable>

          {/* 🔹 HEADER */}
          <GridThead>
            <HeaderRow>
              {visibleColumns.map((col) => (
                <HeaderCell
                  key={col.key}
                  minWidth={col.minWidth || "100px"}
                  flexGrow={col.flexGrow || "1"}
                  draggable={isDraggable && !isFixedColumnKey(col.key)}
                  textAlign={col.textAlign || "left"}
                  onDragStart={() => handleColumnDragStart(col.key)}
                  onDragOver={(e: React.DragEvent<HTMLTableCellElement>) => e.preventDefault()}
                  onDrop={() => handleColumnDrop(col.key)}
                  onDragEnd={() => {
                    draggingColumnKeyRef.current = null;
                  }}
                  className={isDraggable && !isFixedColumnKey(col.key) ? "cursor-move" : undefined + " " + col.className}
                >
                  <Text as="p" fontSize="12px" fontWeight="700" truncate={true} className="max-w-[90%]" color="white">{col.name}</Text>
                </HeaderCell>
              ))}
            </HeaderRow>
          </GridThead>

          {/* 🔹 BODY */}
          <GridTbody bodyHeightPx={bodyHeight}>
            {!isLoading && data.length === 0 ? (
              <div className="text-center py-4">{emptyMessage}</div>
            ) : (
              data.map((row, rowIndex) => {
                const isAltRow = rowIndex % 2 === 1;
                const rowKey = getRowKey ? getRowKey(row, rowIndex) : rowIndex;
                const isActiveRow = activeRowKey !== null && activeRowKey !== undefined && rowKey === activeRowKey;
                const computedClassName = [
                  onRowClick ? "cursor-pointer" : "",
                  isActiveRow ? "border-l-4 border-l-blue-600" : "",
                  getRowClassName?.(row, rowIndex) ?? "",
                ]
                  .filter(Boolean)
                  .join(" ");
                // const computedStyle = isActiveRow ? { backgroundColor: colors.table.header } : undefined;

                return (
                  <BodyRow
                    key={rowKey}
                    translateYPx={rowIndex * resolvedRowHeightPx}
                    isAlt={isAltRow}
                    rowHeightPx={resolvedRowHeightPx}
                    onClick={() => onRowClick?.(row)}
                    className={computedClassName}
                  // style={computedStyle}
                  >
                    {visibleColumns.map((col) => (
                      <BodyCell
                        key={col.key}
                        minWidth={col.minWidth || "100px"}
                        flexGrow={col.flexGrow || "1"}
                        className={col.className}
                        textAlign={col.textAlign || "left"}
                        onClick={(e: React.MouseEvent<HTMLTableCellElement>) => {
                          // Only block row click when a cell-level handler exists.
                          if (col.onCellClick) {
                            e.stopPropagation();
                            col.onCellClick(row, rowIndex, e);
                          }
                        }}
                      >
                        {col.rawCell ? (
                          col.render?.(row, rowIndex) ?? null
                        ) : (
                          <Text truncate={true} fontSize="12px" fontWeight="400" className="max-w-[90%]">
                            {col.render?.(row, rowIndex) ?? ""}
                          </Text>
                        )}
                      </BodyCell>
                    ))}
                  </BodyRow>
                );
              })
            )}
          </GridTbody>

        </GridTable>
      </TableScrollArea>

      {/* 🔹 SHOWING RECORD */}
      <ShowingRecord
        ref={bottomBarRef}
        current={data.length || 0}
        total={paginationProps?.total || 0}
        page={paginationProps?.page || 1}
        pageSize={paginationProps?.pageSize || 25}
        onPageChange={paginationProps?.onPageChange}
        isLoading={isLoading || false}
        setRowsPerPageStatic={paginationProps?.setRowsPerPageStatic}
        columnVisibilityMenu={columnVisibilityMenu}
        paginationProps={paginationProps !== null ? true : false}
      />
    </>
  );
};

export default Table;