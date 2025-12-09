import { cn } from "@/lib/utils";
import { Button as BaseButton } from "@base-ui-components/react";

export type PrimaryButtonType = BaseButton.Props & {
  variant: "filled" | "outlined";
};

export function PrimaryButton({
  variant,
  className,
  children,
  ...props
}: PrimaryButtonType) {
  return (
    <BaseButton
      className={cn(
        "rounded-lg px-3.5 py-1 text-sm font-medium transition-colors",
        "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        variant === "filled" &&
          "bg-primary text-on-primary hover:outline-primary/75 hover:bg-primary/75 shadow-md outline-2 outline-offset-2",
        variant === "outlined" &&
          "border-neutral-4/50 text-on-neutral-1 hover:bg-neutral-3 border-2",
        className,
      )}
      {...props}
    >
      {children}
    </BaseButton>
  );
}
