// Peer review: "Reactivity & State Management" — wraps the existing
// authStore.js functions (unchanged, still the source of truth) in a
// React Context so components re-render on login/logout instantly,
// including in *other browser tabs* via the native "storage" event.
//
// Scope note: only auth gets this treatment. Events/comments/signups
// stay as plain functions (each page re-fetches after its own
// mutations, same pattern CommentSection already used) — converting
// every store into a hook is out of scope for this timeline and the
// current app has no place where that reactivity gap causes a bug.

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCurrentUser, login as storeLogin, logout as storeLogout } from "../utils/authStore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const refresh = useCallback(() => setUser(getCurrentUser()), []);

  useEffect(() => {
    // Fires when localStorage changes from *another* tab/window.
    function handleStorage(e) {
      if (e.key === "campushub_current_user" || e.key === null) refresh();
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [refresh]);

  function login(userId) {
    storeLogin(userId);
    refresh();
  }

  function logout() {
    storeLogout();
    // Peer review: "Logout Cleanup" — force a hard reload rather than a
    // client-side navigate, so no component's local state (draft
    // comments, open forms, cached lists) survives as ghost data.
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
