export function removeEmpty<T>(obj?: { [K: string]: any }): T {
  if (!obj)
    return {} as T;
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => v !== null && v !== undefined && v !== '')
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
  ) as T;
}