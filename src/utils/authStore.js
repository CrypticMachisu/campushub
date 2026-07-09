// Simulates a login system with no backend and no passwords — "logging
// in" just means selecting an account from a static list (mockUsers).
// Shared contract: 00-shared-contracts.md — don't rename exports,
// Navbar/Login/CommentSection/Dashboard all import these directly.

import { users } from "../data/mockUsers";

const CURRENT_USER_KEY = "campushub_current_user";

/** Log in as a given user id (no password — just stores the id). */
export function login(userId) {
  localStorage.setItem(CURRENT_USER_KEY, userId);
}

/** Log out the current user. */
export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/**
 * Return the full logged-in user object, or null if nobody is logged
 * in or the stored id doesn't match anyone (handled gracefully).
 */
export function getCurrentUser() {
  try {
    const id = localStorage.getItem(CURRENT_USER_KEY);
    if (!id) return null;
    return users.find((u) => u.id === id) || null;
  } catch {
    return null;
  }
}

/**
 * Whether a given user is allowed to manage a given club's dashboard.
 * - tier1: can manage any club.
 * - tier2: can manage only clubs listed in their adminForClubs.
 * - member or missing user: never.
 */
export function canManageClub(user, clubId) {
  if (!user) return false;
  if (user.role === "tier1") return true;
  if (user.role === "tier2") return user.adminForClubs.includes(clubId);
  return false;
}
