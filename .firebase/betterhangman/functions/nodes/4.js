

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/play/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.D7-1BP3T.js","_app/immutable/chunks/scheduler.E9WtA0gz.js","_app/immutable/chunks/index.DCxFLS1H.js"];
export const stylesheets = ["_app/immutable/assets/app.DH_r5l8b.css"];
export const fonts = [];
