import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Text } from "@/components/common/Text";
import { colors } from "@/styles/colors";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";


interface ColumnOption {
  key: string;
  name: string | React.ReactNode;
}

interface CCTableColumnVisibilityMenuProps {
  columns: ColumnOption[];
  visibleColumnKeys: string[];
  onToggleColumn: (columnKey: string, checked: boolean) => void;
  onShowAllColumns: () => void;
  triggerClassName?: string;
}

const CCTableColumnVisibilityMenu = ({
  columns,
  visibleColumnKeys,
  onToggleColumn,
  onShowAllColumns,
  triggerClassName,
}: CCTableColumnVisibilityMenuProps) => {
  const visibleCount = columns.filter((column) =>
    visibleColumnKeys.includes(column.key)
  ).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-full w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            triggerClassName
          )}
        >
          <Text fontSize="12px" color={colors.text.black} truncate>
            Columns ({visibleCount})
          </Text>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 p-0">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <Text fontSize="12px" fontWeight="600">
            Show/Hide Columns
          </Text>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs"
            onClick={(e) => {
              e.preventDefault();
              onShowAllColumns();
            }}
          >
            Show All
          </Button>
        </div>
        <div className="max-h-72 overflow-auto p-1">
          {columns.map((column) => {
            const isChecked = visibleColumnKeys.includes(column.key);

            return (
              <label
                key={column.key}
                className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(value) =>
                    onToggleColumn(column.key, value === true)
                  }
                />
                <span className="truncate text-xs">{column.name}</span>
              </label>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CCTableColumnVisibilityMenu;
