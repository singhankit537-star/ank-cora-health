/** Module Federation remote types when VITE_UI_MFE_REMOTE is set */
declare module 'uiMfe' {
  export * from '@ank-cora/ui-mfe';
}

declare module 'uiMfe/theme.css' {
  const css: string;
  export default css;
}
