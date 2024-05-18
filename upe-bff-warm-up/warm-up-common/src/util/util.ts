
export function createDate() {
  const today = new Date(Date.now());
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  return today;
}

/**
 * Sanitiza a entrada de uma string
 *
 * @export
 * @param {string} value
 * @return {*}
 */
export function sanitizeString(
  value: string | null | undefined
): string | null {
  return value ? escape(value.trim()) : null;
}

export function sanitizeArray(
  value: string[] | null | undefined
): string[] | null {
  return value
    ? value.map((item: string) => sanitizeString(item) as string)
    : null;
}
