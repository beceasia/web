export function subscribeBrowserStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("bece-storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("bece-storage", callback);
  };
}
export function storedValue(key: string) {
  try {
    return window.localStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
export function saveBrowserValue(key: string, value: string) {
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new Event("bece-storage"));
}
