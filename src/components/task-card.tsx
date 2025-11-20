"use client";

import { Task } from "@/generated/prisma/browser";
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

export function TaskCard({ name, deadline, isCompleted }: Task) {
  return (
    <Item variant="outline">
      <ItemMedia>
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => console.log("aowkwk")}
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{deadline.toString()}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Action
        </Button>
      </ItemActions>
    </Item>
  );
}
