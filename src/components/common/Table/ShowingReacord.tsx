import { forwardRef } from "react";
import {
  PaginationControls,
  ShowingRecordText,
} from "./ShowingRecord.style";

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";

import { Text } from "@/components/common/Text";
import { colors } from "@/styles/colors";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DEFAULT_PAGE_SIZE = 25;

const PAGE_SIZES = [
  10,
  25,
  50,
  100,
  200,
  500,
  1000,
];

interface ShowingRecordProps {
  current: number;
  total: number;
  page?: number;
  pageSize?: number;
  onPageChange?: (
    nextPage: number
  ) => void;
  isLoading?: boolean;
  setRowsPerPageStatic?: (
    pageSize: number
  ) => void;
  columnVisibilityMenu?: React.ReactNode;
  paginationProps?: boolean;
}

export const ShowingRecord =
  forwardRef<
    HTMLDivElement,
    ShowingRecordProps
  >(({
    total,
    page,
    pageSize,
    onPageChange,
    isLoading,
    setRowsPerPageStatic,
    columnVisibilityMenu,
    paginationProps,
  },
    ref
  ) => {

    const effectivePageSize = typeof pageSize === "number" && Number.isFinite(pageSize) && pageSize > 0 ? pageSize : null;

    const isPaginated = typeof page === "number" && typeof onPageChange === "function" && effectivePageSize !== null;

    const safeTotal = typeof total === "number" && Number.isFinite(total) ? total : 0;

    const computedTotalPages = isPaginated ? Math.ceil(safeTotal / effectivePageSize) : 1;

    const totalPages = Number.isFinite(computedTotalPages) && computedTotalPages > 0 ? computedTotalPages : 1;

    const safePage = isPaginated ? Math.min(Math.max(1, Number.isFinite(page) ? page : 1), totalPages) : 1;

    const selectPageSize = typeof pageSize === "number" && Number.isFinite(pageSize) && pageSize > 0 ? pageSize : DEFAULT_PAGE_SIZE;

    return (
      <div className="flex w-full items-center justify-between h-[48px]">


        {/* Rows per page + column visibility */}
        <div className="flex items-center gap-2">
          {paginationProps && (
            <div className="flex h-[32px] w-[85px] items-center">
              <Select
                value={String(selectPageSize)}
                onValueChange={(value) => setRowsPerPageStatic?.(Number(value))}
              >
                <SelectTrigger className="h-full w-full">
                  <SelectValue placeholder="Rows">
                    <Text fontSize="12px" color={colors.text.black}>
                      {selectPageSize}
                    </Text>
                  </SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {PAGE_SIZES.map((size) => (
                    <SelectItem key={size} value={size.toString()}>
                      <Text fontSize="12px" color={colors.text.black}>
                        {size}
                      </Text>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {columnVisibilityMenu && (
            <div className="flex h-[32px] w-[120px] items-center">
              {columnVisibilityMenu}
            </div>
          )}
        </div>


        {/* Right Section */}
        {paginationProps && (
          <div className="flex items-center gap-4">

            {/* Pagination */}
            <PaginationControls ref={ref} className="pointer-events-auto h-[32px]">
              <TooltipProvider delayDuration={50} >
                <PaginationContent className="h-[32px]">
                  {/* Prev */}
                  <PaginationItem className="h-[32px]">
                    <PaginationPrevious
                      onClick={(e) => {
                        e.preventDefault();
                        if (safePage > 1 && !isLoading) {
                          onPageChange?.(safePage - 1);
                        }
                      }}
                      className={safePage <= 1 ? "pointer-events-none h-8 w-8 min-h-0 p-0 opacity-50" : "h-8 w-8 min-h-0 cursor-pointer p-0"}
                    />
                  </PaginationItem>

                  {/* Current Page */}
                  <PaginationItem className="h-[32px]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <PaginationLink
                          isActive
                          className="h-8 w-8 min-h-0 cursor-pointer p-0"
                        >
                          <Text as="span" fontSize="12px">
                            {safePage}
                          </Text>
                        </PaginationLink>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="max-h-[100px] max-w-[41vw] overflow-y-auto p-2"
                      >
                        <div className="flex flex-wrap items-center gap-0.5">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <span
                              key={pageNum}
                              role="button"
                              tabIndex={isLoading ? -1 : 0}
                              aria-disabled={isLoading}
                              onClick={() => {
                                if (!isLoading) {
                                  onPageChange?.(pageNum);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (!isLoading && (e.key === "Enter" || e.key === " ")) {
                                  e.preventDefault();
                                  onPageChange?.(pageNum);
                                }
                              }}
                              className={`inline-flex h-7 min-w-7 shrink-0 cursor-pointer items-center justify-center rounded px-1 hover:bg-accent ${isLoading ? "cursor-not-allowed opacity-50" : ""
                                } ${pageNum === safePage ? "bg-accent" : ""}`}
                            >
                              <Text as="span" fontSize="12px">
                                {pageNum}
                              </Text>
                            </span>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </PaginationItem>

                  {/* Next */}
                  <PaginationItem className="h-[32px]">
                    <PaginationNext
                      onClick={(e) => {
                        e.preventDefault();

                        if (safePage < totalPages && !isLoading) {
                          onPageChange?.(safePage + 1);
                        }
                      }}
                      className={safePage >= totalPages ? "pointer-events-none h-8 w-8 min-h-0 p-0 opacity-50" : "h-8 w-8 min-h-0 cursor-pointer p-0"}
                    />
                  </PaginationItem>

                </PaginationContent>
              </TooltipProvider>
            </PaginationControls>

          </div>
        )}

        {/* Total Records */}
        {paginationProps && (
          <ShowingRecordText>
            <Text as="span" fontSize="12px">
              Total Records :{" "}
              {total}
            </Text>
          </ShowingRecordText>
        )}

      </div>
    )
  });

ShowingRecord.displayName =
  "ShowingRecord";