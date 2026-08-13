import source from "./data/variables.json";

export type ThemeId = "carbrain-light" | "carbrain-dark" | "brandx-light";
type RGBA = { r: number; g: number; b: number; a: number };
type Alias = { type: "ALIAS"; aliasOf: string };
type Value = RGBA | Alias | number | string;
type RawVariable = { name: string; resolvedType: string; scopes: string[]; values: Record<string, Value> };
type RawCollection = { name: string; modes: { id: string; name: string }[]; variables: RawVariable[] };

export const rawCollections = source as Record<string, RawCollection>;
const allVariables = Object.values(rawCollections).flatMap(collection => collection.variables);
const byName = new Map(allVariables.map(variable => [variable.name, variable]));

export const themes: { id: ThemeId; label: string; figmaMode: string }[] = [
  { id: "carbrain-light", label: "CarBrain · Light", figmaMode: "☼ CarBrain - Light" },
  { id: "carbrain-dark", label: "CarBrain · Dark", figmaMode: " ☾  CarBrain - Dark" },
  { id: "brandx-light", label: "BrandX · Light", figmaMode: "☼ BrandX - Light" },
];

const renameRules: [string | RegExp, string][] = [
  [/^color\/feedback\/sucess\//, "color/feedback/success/"],
  [/^color\/feedback\/information\//, "color/feedback/info/"],
  [/^color\/icons\//, "color/icon/"],
  ["color/stroke/defaukt", "color/stroke/default"],
  ["color/text/disable", "color/text/disabled"],
  ["color/static/inverse", "color/text/contrast/inverse"],
  ["color/static/default", "color/text/contrast/default"],
  ["color/feedback/warning/main", "color/feedback/warning/base"],
  ["color/feedback/info/main", "color/feedback/info/base"],
];

export function canonicalName(name: string) {
  return renameRules.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), name);
}

function isAlias(value: Value): value is Alias {
  return typeof value === "object" && value !== null && "type" in value && value.type === "ALIAS";
}

function isRGBA(value: Value): value is RGBA {
  return typeof value === "object" && value !== null && "r" in value && "g" in value && "b" in value;
}

function valueFor(variable: RawVariable, mode: string): Value | undefined {
  return variable.values[mode] ?? variable.values.Value ?? Object.values(variable.values)[0];
}

export function resolveVariable(name: string, mode: string, visited = new Set<string>()): Value | undefined {
  if (visited.has(name)) return undefined;
  visited.add(name);
  const variable = byName.get(name);
  if (!variable) return undefined;
  const value = valueFor(variable, mode);
  return value && isAlias(value) ? resolveVariable(value.aliasOf, mode, visited) : value;
}

export function formatValue(value: Value | undefined): string {
  if (value === undefined) return "—";
  if (isAlias(value)) return value.aliasOf;
  if (isRGBA(value)) {
    const channels = [value.r, value.g, value.b].map(channel => Math.round(channel * 255));
    if (value.a < 0.999) return `rgba(${channels.join(", ")}, ${Number(value.a.toFixed(2))})`;
    return `#${channels.map(channel => channel.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
  }
  return String(value);
}

export function aliasFor(name: string, mode: string): string {
  const variable = byName.get(name);
  if (!variable) return "—";
  const value = valueFor(variable, mode);
  return value && isAlias(value) ? value.aliasOf : "Direct value";
}

export const collectionSummary = Object.values(rawCollections).map(collection => ({
  name: collection.name,
  modes: collection.modes.map(mode => mode.name.trim()),
  count: collection.variables.length,
  types: [...new Set(collection.variables.map(variable => variable.resolvedType))],
}));

export const semanticTokens = rawCollections["2 - Semantic"].variables.map(variable => ({
  sourceName: variable.name,
  canonicalName: canonicalName(variable.name),
  scopes: variable.scopes,
  ungrouped: !variable.name.includes("/"),
  modes: Object.fromEntries(themes.map(theme => [theme.id, {
    alias: aliasFor(variable.name, theme.figmaMode),
    resolved: formatValue(resolveVariable(variable.name, theme.figmaMode)),
  }])) as Record<ThemeId, { alias: string; resolved: string }>,
}));

export const migrations = semanticTokens
  .filter(token => token.sourceName !== token.canonicalName || token.ungrouped)
  .map(token => ({ source: token.sourceName, target: token.ungrouped ? "Needs classification" : token.canonicalName, issue: token.ungrouped ? "Ungrouped semantic variable" : "Canonical naming correction" }));

const primitiveVariables = rawCollections["1 - Primitives"].variables;
export const paletteGroups = Object.entries(primitiveVariables.reduce<Record<string, RawVariable[]>>((groups, variable) => {
  const parts = variable.name.split("/");
  const last = parts.at(-1) ?? "";
  if (!/^\d+$/.test(last) || variable.name.startsWith("Alpha/")) return groups;
  const family = parts.slice(0, -1).join("/");
  (groups[family] ??= []).push(variable);
  return groups;
}, {})).map(([name, variables]) => ({
  name,
  colors: variables.sort((a, b) => Number(a.name.split("/").at(-1)) - Number(b.name.split("/").at(-1))).map(variable => ({
    step: variable.name.split("/").at(-1) ?? "",
    name: variable.name,
    value: formatValue(resolveVariable(variable.name, "Value")),
  })),
}));

export const typography = rawCollections["3 - Typography"].variables.map(variable => ({
  name: variable.name,
  type: variable.resolvedType,
  desktop: formatValue(resolveVariable(variable.name, "Desktop")),
  mobile: formatValue(resolveVariable(variable.name, "Mobile")),
}));

export const units = rawCollections["4 - Units"].variables.map(variable => ({ name: variable.name, value: formatValue(resolveVariable(variable.name, "Value")) }));
export const radii = rawCollections["5 - Radius"].variables.map(variable => ({ name: variable.name, value: formatValue(resolveVariable(variable.name, "Value")) }));
export const grids = rawCollections["6 - Grids"].variables.map(variable => ({
  name: variable.name,
  desktop: formatValue(resolveVariable(variable.name, "Desktop")), tablet: formatValue(resolveVariable(variable.name, "Tablet")), mobile: formatValue(resolveVariable(variable.name, "Mobile")),
}));

const cssTokenMap: Record<string, string> = {
  "--surface-canvas": "color/background/canvas", "--surface": "color/background/surface", "--surface-subtle": "color/background/subtle", "--surface-strong": "color/background/strong",
  "--text-strong": "color/text/strong", "--text-default": "color/text/default", "--text-muted": "color/text/muted", "--text-inverse": "color/text/inverse",
  "--stroke-subtle": "color/stroke/subtle", "--stroke-default": "color/stroke/defaukt", "--action": "color/action/primary/base", "--action-hover": "color/action/primary/dark",
  "--accent": "color/action/secondary/base", "--accent-soft": "color/action/secondary/lighter", "--success": "color/feedback/sucess/base", "--danger": "color/feedback/error/base",
  "--action-primary-lighter": "color/action/primary/lighter", "--action-primary-light": "color/action/primary/light", "--action-primary-base": "color/action/primary/base", "--action-primary-dark": "color/action/primary/dark", "--action-primary-darker": "color/action/primary/darker",
  "--action-secondary-lighter": "color/action/secondary/lighter", "--action-secondary-light": "color/action/secondary/light", "--action-secondary-base": "color/action/secondary/base", "--action-secondary-dark": "color/action/secondary/dark", "--action-secondary-darker": "color/action/secondary/darker",
  "--action-tertiary-lighter": "color/action/tertiary/lighter", "--action-tertiary-light": "color/action/tertiary/light", "--action-tertiary-base": "color/action/tertiary/base", "--action-tertiary-dark": "color/action/tertiary/dark", "--action-tertiary-darker": "color/action/tertiary/darker",
  "--action-neutral-lighter": "color/action/neutral/lighter", "--action-neutral-light": "color/action/neutral/light", "--action-neutral-base": "color/action/neutral/base", "--action-neutral-dark": "color/action/neutral/dark", "--action-neutral-darker": "color/action/neutral/darker",
  "--feedback-error-lighter": "color/feedback/error/lighter", "--feedback-error-light": "color/feedback/error/light", "--feedback-error-base": "color/feedback/error/base", "--feedback-error-dark": "color/feedback/error/dark",
  "--button-text-inverse": "color/text/inverse", "--button-text-disabled": "color/text/disable", "--button-stroke-default": "color/stroke/defaukt", "--button-stroke-strong": "color/stroke/strong",
};

export function cssVariables(theme: ThemeId): Record<string, string> {
  const mode = themes.find(item => item.id === theme)?.figmaMode ?? themes[0].figmaMode;
  return Object.fromEntries(Object.entries(cssTokenMap).map(([property, token]) => [property, formatValue(resolveVariable(token, mode))]));
}

export const audit = {
  variableCount: allVariables.length,
  collectionCount: Object.keys(rawCollections).length,
  semanticCount: semanticTokens.length,
  primitiveCount: primitiveVariables.length,
  migrationCount: migrations.length,
};
