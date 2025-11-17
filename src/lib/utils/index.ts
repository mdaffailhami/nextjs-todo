import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(seconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function generateRandomNumber(min: number, max: number): number {
  // This function generates a random number between min (inclusive) and max (inclusive)
  // For example, if min is 1 and max is 3, the function can return 1, 2 or 3
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
