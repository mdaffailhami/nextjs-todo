import { Checkbox as BaseCheckbox } from "@base-ui-components/react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CheckboxProps = BaseCheckbox.Root.Props & {};

export const Checkbox = ({ className, ...props }: CheckboxProps) => {
  return (
    <BaseCheckbox.Root
      className={cn(
        "bg-neutral-3 border-neutral-4 flex size-5.5 cursor-pointer overflow-hidden rounded-md border transition-colors",
        "group hover:bg-neutral-4",
        className,
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="bg-primary group-hover:bg-primary/75 size-full p-0.5">
        <CheckIcon className={cn("text-on-primary size-full")} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
};
