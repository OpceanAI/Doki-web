export function setCookie(name: string, value: string, options: { path?: string; maxAge?: number } = {}) {
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  if (options.path) cookie += `; path=${options.path}`
  if (options.maxAge) cookie += `; max-age=${options.maxAge}`
  document.cookie = cookie
}
