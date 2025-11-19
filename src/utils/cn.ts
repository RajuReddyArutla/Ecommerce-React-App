import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind CSS classes and resolves conflicts for better dynamic styling.
 * It uses 'clsx' for conditional class joining and 'tailwind-merge' for eliminating redundant classes.
 * * @param inputs - A list of class strings, objects, or arrays to be conditionally joined.
 * @returns A single, optimized string of CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  // ClassValue comes from 'clsx' and twMerge from 'tailwind-merge'
  return twMerge(clsx(inputs));
}