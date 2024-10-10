

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DO6oKN9S.js","_app/immutable/chunks/scheduler.DUa3pFyD.js","_app/immutable/chunks/index.CyHb5FMB.js"];
export const stylesheets = [];
export const fonts = [];
