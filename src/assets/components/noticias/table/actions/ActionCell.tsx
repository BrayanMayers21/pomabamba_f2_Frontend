"use client";

import React from "react";
import { Button } from "../../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../../../../../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

// Interfaz para las acciones
export interface TableAction {
  id: string;
  label: string;
  icon: React.ReactElement;
  onClick: (item: any) => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
}

interface ActionCellProps {
  item: any;
  actions: TableAction[];
}

const ActionCell: React.FC<ActionCellProps> = ({ item, actions }) => {
  if (actions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <React.Fragment key={action.id}>
            <DropdownMenuItem
              onClick={() => action.onClick(item)}
              disabled={action.disabled}
              className={
                action.variant === "destructive"
                  ? "text-destructive focus:text-destructive"
                  : ""
              }
            >
              <div className="flex items-center gap-2">
                {action.icon}
                <span>{action.label}</span>
              </div>
            </DropdownMenuItem>
            {index < actions.length - 1 && <DropdownMenuSeparator />}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
