import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;

export const getChangedFields = <T extends object>(
  original: T,
  updated: T
): Partial<T> => Object.keys(updated).reduce((changes, key) => {
    if (updated[key as keyof T] !== original[key as keyof T]) {
      changes[key as keyof T] = updated[key as keyof T];
    }
    return changes;
  }, {} as Partial<T>);
