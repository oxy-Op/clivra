import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function log(...args: any[]) {
  if (process.env.LOCAL) {
    console.log(...args);
  }
}
