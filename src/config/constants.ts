export const JWT_CONFIG = {
  ACCESS_EXPIRES: "15m",
  REFRESH_EXPIRES: "7d"
} as const;

export const ROLES = {
  FARMER: "FARMER",
  BRAND: "BRAND"
} as const;

export const STATUS = {
  PENDING: "PENDING",
  PROCESSED: "PROCESSED"
} as const;

export const ROAST_LEVELS = {
  LIGHT: "LIGHT",
  MEDIUM: "MEDIUM",
  DARK: "DARK"
} as const;

export const ERRORS = {
  EMAIL_REGISTERED: "Email already registered",
  INVALID_CREDENTIALS: "Invalid credentials",
  ACCESS_DENIED: "Access denied. No token provided.",
  INVALID_TOKEN: "Invalid token.",
  UNAUTHORIZED_ROLE: "Access denied. Unauthorized role.",
  FIELDS_REQUIRED: "All fields are required",
  INVALID_ROLE: "Invalid role value",
  MISSING_PRODUCT_FIELDS: "Missing required product fields",
  PRODUCT_NOT_FOUND: "Product not found",
  PRODUCT_DELETED: "Product deleted successfully",
  INVALID_VARIETY_WEIGHT: "Invalid variety or weight",
  UNAUTHORIZED: "Unauthorized",
  INVALID_PRICE: "Invalid price"
} as const;
