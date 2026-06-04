/// <reference types="vite/client" />

// Fallback declarations for CSS side-effect imports so that
// `noUncheckedSideEffectImports` does not flag them when the
// `vite/client` types are unavailable.
declare module '*.css';
