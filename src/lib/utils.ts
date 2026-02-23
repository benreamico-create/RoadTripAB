import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a number as Canadian dollars */
export function formatCAD(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
  }).format(amount)
}

/** Generate a URL-safe route slug */
export function routeSlug(from: string, to: string): string {
  const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, '-')
  return `${slugify(from)}-to-${slugify(to)}`
}
