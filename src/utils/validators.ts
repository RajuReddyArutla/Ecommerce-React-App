// src/utils/validators.ts

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): boolean {
  // At least 6 characters
  return password.length >= 6;
}

/**
 * Validate phone number (US format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone);
}

/**
 * Validate zip code (US format)
 */
export function isValidZipCode(zipCode: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
}

/**
 * Validate price (positive number with up to 2 decimals)
 */
export function isValidPrice(price: number): boolean {
  return price > 0 && /^\d+(\.\d{1,2})?$/.test(price.toString());
}

/**
 * Validate stock quantity (positive integer)
 */
export function isValidStock(stock: number): boolean {
  return Number.isInteger(stock) && stock >= 0;
}