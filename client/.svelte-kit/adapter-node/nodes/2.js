

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.COvU0y_n.js","_app/immutable/chunks/scheduler.DUa3pFyD.js","_app/immutable/chunks/index.CyHb5FMB.js"];
export const stylesheets = ["_app/immutable/assets/2.CZ60xiwH.css"];
export const fonts = [];
