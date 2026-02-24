const enabledValues = new Set(['1', 'true', 'yes', 'on']);

export function isClientDebugEnabled(flag: string): boolean {
  if (process.env.NODE_ENV !== 'development') {
    return false;
  }

  const value = process.env[flag]?.trim().toLowerCase();
  return value ? enabledValues.has(value) : false;
}
