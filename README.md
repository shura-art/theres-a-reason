# There's a Reason / Есть повод

A private PWA for a closed group of friends — create reasons to meet, chat about them, and never miss a birthday.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** build tool
- **Tailwind CSS** styling
- **React Router** routing
- **Framer Motion** animations
- **Google Maps API** for maps
- **PWA** with offline support & push notifications

## Getting Started

```bash
npm install
npm run dev      # development
npm run build    # production build
npm run preview  # preview production build
```

## Environment Variables

Create a `.env` file (optional — app works without these):

```
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

The map works without an API key (uses a stylized fallback). Add the key to enable real Google Maps.

## Deploy to Vercel

1. Push to GitHub
2. Import the repo in Vercel
3. Vercel auto-detects Vite — no config needed
4. (Optional) Add `VITE_GOOGLE_MAPS_API_KEY` in Vercel env settings
5. Deploy

## Features

- 🎉 Create reasons (birthday, BBQ, games, hiking, coffee, movie, sports, dinner, music, photo walk, learning, important, random)
- 🎲 500+ random funny holidays in a local JSON database
- 💬 Event-based mini-chats (auto-delete after 7 days of inactivity)
- ✅ RSVP: I'm Going / Maybe / Can't Come
- 🗺️ Google Maps integration for meeting locations
- 👥 Private friend system (max ~20 members, invite by link)
- 🔔 Push notifications (birthday, new event, chat messages, friend activity)
- 😊 Stickers in chat (droplet stickers + quick reactions)
- 📱 PWA with offline support, installable, dark/light theme
- ♿ Accessible (ARIA labels, keyboard navigation, large touch targets)

## Project Structure

```
/src
  /components   — reusable UI components
  /pages         — screen components
  /context       — React Context providers
  /hooks         — custom hooks
  /services      — external service integrations
  /data          — local data (holidays, stickers, seed data)
  /types         — TypeScript type definitions
  /utils         — utility functions
/public
  /icons         — PWA icons
  manifest.webmanifest
  sw.js          — service worker
```

## License

Private project for friends. Not commercial.
