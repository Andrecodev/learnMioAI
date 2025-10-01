import { User } from "firebase/auth";

/**
 * Get user's display name or fallback to email or default
 */
export function getUserDisplayName(user: User | null): string {
  if (!user) return "Guest User";
  
  return user.displayName || user.email?.split('@')[0] || "User";
}

/**
 * Get user's email
 */
export function getUserEmail(user: User | null): string {
  if (!user) return "";
  
  return user.email || "";
}

/**
 * Get user's profile photo URL
 */
export function getUserPhotoURL(user: User | null): string {
  if (!user) return "";
  
  return user.photoURL || "";
}

/**
 * Get user's initials for avatar fallback
 */
export function getUserInitials(user: User | null): string {
  if (!user) return "GU";
  
  const displayName = getUserDisplayName(user);
  
  // Try to get initials from display name first
  if (user.displayName) {
    const names = user.displayName.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.displayName.slice(0, 2).toUpperCase();
  }
  
  // Fallback to first letter of email or display name
  if (user.email) {
    return user.email[0].toUpperCase();
  }
  
  return "U";
}

/**
 * Get a consistent avatar placeholder URL
 */
export function getDefaultAvatarURL(): string {
  return "/placeholder-user.jpg";
}

/**
 * Get a generated avatar URL based on user's name or initials
 * Uses a service like DiceBear for consistent avatar generation
 */
export function getGeneratedAvatarURL(user: User | null): string {
  if (!user) return getDefaultAvatarURL();
  
  const name = getUserDisplayName(user);
  const encodedName = encodeURIComponent(name);
  
  // Using DiceBear avatars as a fallback - you can also use other services
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}&backgroundColor=3b82f6&textColor=ffffff`;
}

/**
 * Get the best available avatar URL for the user
 * Priority: Google photo -> Generated avatar -> Default placeholder
 */
export function getBestAvatarURL(user: User | null): string {
  const googlePhoto = getUserPhotoURL(user);
  
  if (googlePhoto) {
    // Ensure Google photos are high resolution
    const highResPhoto = googlePhoto.replace('s96-c', 's400-c');
    return highResPhoto;
  }
  
  // Return generated avatar as fallback
  return getGeneratedAvatarURL(user);
}

/**
 * Check if user has a profile photo
 */
export function hasUserPhoto(user: User | null): boolean {
  return !!(user?.photoURL);
}