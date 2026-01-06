/**
 * Google JWT decoded payload structure
 */
export interface GoogleJwtPayload {
  sub: string; // Google user ID
  email: string;
  email_verified?: boolean;
  name?: string; // Full name
  given_name?: string; // First name
  family_name?: string; // Last name
  picture?: string; // Profile picture URL
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

/**
 * Google login payload sent to API
 */
export interface GoogleLoginPayload {
  googleId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  avatarUrl?: string;
}

