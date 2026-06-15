import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWhatsAppLink(phone: string, message?: string) {
  const url = `https://wa.me/${phone.replace(/[^0-9]/g, "")}`
  return message ? `${url}?text=${encodeURIComponent(message)}` : url
}