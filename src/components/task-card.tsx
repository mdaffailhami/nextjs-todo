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
  onCheckedChange?: (isChecked: boolean) => void;
  onEditButtonPress?: () => void;
  onDeleteButtonPress?: () => void;
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

            // Add delay to create an animation-like effect
            await delay(0.3);

            onCheckedChange?.(checked);

            setIsChecked(!checked);
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
        <Checkbox checked={false} onCheckedChange={() => {}} />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          <Skeleton className="h-4 w-24" />
        </ItemTitle>
        <ItemDescription>
          <Skeleton className="h-4 w-20" />
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon">
          <Trash className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </ItemActions>
    </Item>
  );
}
