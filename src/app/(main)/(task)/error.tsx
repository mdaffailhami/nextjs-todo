"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-center text-lg font-medium italic">
        Something went wrong!
      </span>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try Again
      </Button>
    </div>
  );
}
