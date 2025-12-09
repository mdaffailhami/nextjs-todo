import { cn } from "@/lib/utils";
import { Input as BaseInput } from "@base-ui-components/react";

export type InputProps = BaseInput.Props & {};

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <BaseInput
      {...props}
      className={cn(
        "border-neutral-4 bg-neutral-2 h-10 w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors",
        "placeholder:text-on-neutral-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:bg-neutral-1 focus:outline-primary/75 outline-2",
      )}
    />
  );
};
