import { cn } from "@/lib/utils";
import { Button } from "@base-ui-components/react";
import { type LucideIcon } from "lucide-react";

export type IconButtonProps = Button.Props & {
  variant: "filled" | "ghost";
  icon: LucideIcon;
};

export function IconButton({
  icon: Icon,
  variant = "ghost",
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      className={cn(
        "cursor-pointer p-2.5 transition-colors",
        variant === "filled" &&
          "bg-primary text-on-primary hover:bg-primary/75 hover:outline-primary/75 rounded-lg outline-2 outline-offset-2",
        variant === "ghost" && "hover:bg-neutral-3 text-primary rounded-full",
        className,
      )}
      {...props}
    >
      <Icon className="size-5" />
    </Button>
  );
}
