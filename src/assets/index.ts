/**
 * Centralized asset imports.
 * When PNG assets are added to ui-kit subdirectories, import them here
 * and re-export so components have a single import path.
 *
 * Example after adding logo:
 *   import logo from './ui-kit/logo/logo.png';
 *   export const assets = { logo };
 *
 * For now, the app uses inline SVG (Droplet.tsx) and emoji.
 */
export const assets = {} as Record<string, string>;
