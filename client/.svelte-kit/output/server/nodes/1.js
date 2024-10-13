

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.A3gwlJu_.js","_app/immutable/chunks/scheduler.DUa3pFyD.js","_app/immutable/chunks/index.CyHb5FMB.js","_app/immutable/chunks/entry.NTQc7fOs.js"];
export const stylesheets = [];
export const fonts = [];
