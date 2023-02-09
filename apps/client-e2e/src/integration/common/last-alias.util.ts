let lastAlias = '';

export function setLastAlias(alias: string): string {
  /** replace all whitespace characters with '_', so the alias works */
  lastAlias = alias.replace(/\s+/g, '_');
  return lastAlias;
}

export function getLastAlias(): string {
  return `@${lastAlias}`;
}
