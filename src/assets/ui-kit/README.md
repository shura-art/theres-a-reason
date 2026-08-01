# UI Kit Assets

This directory holds all supplied UI Kit PNG assets. Do not rename files.
Import them directly in components: `import logo from '../assets/ui-kit/logo/logo.png'`.

## Structure

| Directory             | Contents                                                      |
|-----------------------|---------------------------------------------------------------|
| `app-icon/`           | App icon (iOS/Android home screen icon)                        |
| `logo/`               | Logo artwork (Fredoka wordmark, splash logo)                  |
| `screens/`            | Screen mockups / reference screenshots                        |
| `event-icons/`        | Per-category event icons (birthday, BBQ, games, etc.)         |
| `participation-icons/`| RSVP status icons (going / maybe / can't)                      |
| `droplet-stickers/`   | Droplet mascot sticker pack                                   |
| `chat-stickers/`      | Chat sticker pack (quick reactions)                           |
| `avatars/`            | Default avatar set                                            |
| `references/`         | Color palette swatches, button styles, additional references  |

## Color Palette Reference

Colors are defined as CSS custom properties in `src/styles.css` (`:root`).
See `references/` for the original palette swatches if supplied.

## Fonts

- **UI:** Nunito (loaded from Google Fonts in `index.html`)
- **Logo:** Fredoka (loaded from Google Fonts in `index.html`)

## Current Implementation

Until PNG assets are placed here, the app uses:
- Inline SVG `Droplet.tsx` component for the mascot
- Emoji for event/category icons (see `src/data/events.ts`)
- Google Fonts for typography
- CSS custom properties for colors

To swap in PNG assets:
1. Drop the PNG files into the matching subdirectory above (keep original names)
2. Import in the relevant component
3. Replace emoji/SVG with `<img src={importedAsset} alt="..." />`
