import pathPage from "@/utils/pathPage"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertRemToPx(rem: number) {
  if (typeof window === 'undefined' || !document?.documentElement) {
    return
  }

  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  ) // Giá trị này sẽ là 1vw
  return rem * rootFontSize
}

export function delay(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${ms / 1000} seconds`)
    }, ms)
  })
}


/**
 * Convert ISO 8601 string -> Unix timestamp
 * @param iso ISO string, vd: "2025-09-04T08:04:38+00:00"
 * @param unit 's' => seconds (default), 'ms' => milliseconds
 */
export function isoToUnixTimestamp(iso: string, unit: 's' | 'ms' = 's'): number {
  const ms = Date.parse(iso); // milliseconds since 1970-01-01T00:00:00Z
  if (Number.isNaN(ms)) {
    throw new Error(`Invalid ISO date string: ${iso}`);
  }
  return unit === 's' ? Math.floor(ms / 1000) : ms;
}

export const ROUTES = [
  {
    path: pathPage.account,
    label: 'Thông tin tài khoản',
    icon: '/user/user.svg',
  },
  {
    path: pathPage.changePassword,
    label: 'Thay đổi mật khẩu',
    icon: '/user/lock.svg',
  },
  {
    path: pathPage.wishlist,
    label: 'Danh sách yêu thích',
    icon: '/user/heart.svg',
  },
]

export function htmlDecode(input: string): string {
  return input?.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    ?.replace(/&lt;/g, '<')
    ?.replace(/&gt;/g, '>')
    ?.replace(/&amp;/g, '&')
    ?.replace(/&quot;/g, '"')
    ?.replace(/&apos;/g, "'")
    ?.replace(/&nbsp;/g, ' ')
    ?.replace(/&copy;/g, '©')
    ?.replace(/&reg;/g, '®')
    ?.replace(/&trade;/g, '™')
    ?.replace(/&euro;/g, '€')
    ?.replace(/&pound;/g, '£')
    ?.replace(/&yen;/g, '¥')
    ?.replace(/&dollar;/g, '$')
    ?.replace(/&hellip;/g, '…')
}