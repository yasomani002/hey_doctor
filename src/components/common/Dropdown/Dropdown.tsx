import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";

type DropdownAction = {
  key: string;
  label: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

interface DropdownProps {
  actions: DropdownAction[];
  align?: "start" | "center" | "end";
  triggerClassName?: string;
}

export default function Dropdown({
  actions,
  align = "end",
  triggerClassName = "h-8 w-8 p-0",
}: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={triggerClassName}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        {actions.map((action) => {
          const menuItem = (
            <DropdownMenuItem
              key={action.key}
              disabled={action.disabled}
              onClick={action.onClick}
            >
              {action.label}
            </DropdownMenuItem>
          );

          // If permission required → wrap with PermissionGate
          return (
            <>
              {menuItem}
            </>
          );

          return menuItem;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
