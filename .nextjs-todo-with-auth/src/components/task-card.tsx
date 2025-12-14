"use client";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Pencil, Trash } from "lucide-react";
import { delay, formatDate } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export type TaskCardProps = {
  name: string;
  deadline: Date;
  isCompleted: boolean;
  excludeEditButton?: boolean;
  onCheckedChange?(isChecked: boolean): void;
  onEditButtonPress?(): void;
  onDeleteButtonPress?(): void;
};

export function TaskCard({
  name,
  deadline,
  isCompleted,
  excludeEditButton = false,
  onCheckedChange,
  onEditButtonPress,
  onDeleteButtonPress,
}: TaskCardProps) {
  const [isChecked, setIsChecked] = useState(isCompleted);

  return (
    <Item variant="outline">
      <ItemMedia>
        <Checkbox
          checked={isChecked}
          onCheckedChange={async (checked) => {
            if (typeof checked !== "boolean") return;

            setIsChecked(checked);

            // Add delay to let the checkbox animation finish
            await delay(0.3);

            onCheckedChange?.(checked);
          }}
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{formatDate(deadline)}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive rounded-full"
          onClick={onDeleteButtonPress}
        >
          <Trash className="h-4 w-4" />
        </Button>
        {!excludeEditButton && (
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:text-primary rounded-full"
            onClick={onEditButtonPress}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </ItemActions>
    </Item>
  );
}

export function TaskCardSkeleton() {
  return (
    <Item variant="outline">
      <ItemMedia>
        <Skeleton className="h-4 w-4" />
      </ItemMedia>
      <ItemContent>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </ItemContent>
      <ItemActions>
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-4" />
      </ItemActions>
    </Item>
  );
}
