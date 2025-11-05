// Simple localStorage auth for demo

const KEY = "ayojon_user"

export function getUser() {
  try { return JSON.parse(localStorage.getItem(KEY) || "null") } catch { return null }
}

export function setUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user))
  window.dispatchEvent(new CustomEvent("ayojon-auth", { detail: user }))
}

export function logout() {
  localStorage.removeItem(KEY)
  window.dispatchEvent(new CustomEvent("ayojon-auth", { detail: null }))
}
