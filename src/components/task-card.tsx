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

export type TaskCardProps = {
  name: string;
  deadline: Date;
  isCompleted: boolean;
  onCheckedChange: (isChecked: boolean) => void;
};

export function TaskCard({
  name,
  deadline,
  isCompleted,
  onCheckedChange,
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

            onCheckedChange(checked);

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
        >
          <Trash className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-primary hover:text-primary rounded-full"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </ItemActions>
    </Item>
  );
}
