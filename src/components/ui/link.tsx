import { cn } from "@/lib/utils";
import NextLink from "next/link";

export type LinkProps = React.ComponentProps<typeof NextLink> & {
  className?: string;
};

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <NextLink
      {...props}
      className={cn("text-primary underline hover:opacity-70", className)}
    >
      {children}
    </NextLink>
  );
}
