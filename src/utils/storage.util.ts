export const getLocalStorage = (key: string) => {
  const temp = window.localStorage.getItem(key) ?? ''
  try {
    return JSON.parse(temp)
  } catch {
    return temp
  }
}
export const setLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}
