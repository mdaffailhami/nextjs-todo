import { cn } from "@/lib/utils";

export const Skeleton = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("bg-neutral-3 animate-pulse", className)} {...props} />
  );
};
