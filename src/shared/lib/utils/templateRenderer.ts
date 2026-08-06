function replaceVariables(
  template: string,
  data: Record<string, unknown>,
): string {
  return template.replace(/\{\{\.(\w+)\}\}/g, (_match, key: string) => {
    const value = data?.[key];
    if (value === null || value === undefined) return "";
    return String(value);
  });
}

function renderIfBlocks(
  template: string,
  data: Record<string, unknown>,
): string {
  const ifRegex = /\{\{if\s+\.([A-Za-z0-9_]+)\}\}([\s\S]*?)\{\{end\}\}/g;
  return template.replace(ifRegex, (_m, key: string, inner: string) => {
    const cond = data?.[key];
    if (cond) {
      return replaceVariables(inner, data);
    }
    return "";
  });
}

export function renderTemplate(
  templateHtml: string,
  data: Record<string, unknown>,
): string {
  const withIfs = renderIfBlocks(templateHtml, data);
  const withVars = replaceVariables(withIfs, data);
  return withVars;
}
