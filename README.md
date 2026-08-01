<div align="center">

# 🎉 There's a Reason
### «Есть повод»

A Progressive Web App for a closed group of friends — create reasons to meet, chat about them, and never miss a birthday.

**Non-commercial · Private group · ~20 members**

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎉 **Create Reasons** | Birthday, BBQ, Games, Hiking, Coffee, Movie, Sports, Dinner, Music, Photo Walk, Learning, Important, Random |
| 🎲 **Random Reason** | 540+ funny holidays in a local JSON database — no scraping, no external APIs |
| 💬 **Event Chats** | Mini-chat per event with text, emoji, stickers & images. Auto-deletes 7 days after last message |
| ✅ **RSVP** | Three statuses: *I'm Going* / *Maybe* / *Can't Come* — on cards, in chat, in participant list |
| 🗺️ **Map** | Google Maps with meeting location markers. "Open in Google Maps" button. No routing |
| 👥 **Friends** | Invite by link, private group, max ~20 members |
| 🔔 **Notifications** | Birthday reminders, new events, chat messages, friend activity, status changes |
| 😊 **Stickers** | Droplet stickers in chat + quick emoji reactions |
| 📱 **PWA** | Installable, offline support, push notifications, dark/light theme |
| ♿ **Accessibility** | ARIA labels, keyboard navigation, large touch targets, readable text |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router 7 |
| State | React Context + Hooks |
| Animations | Framer Motion |
| Maps | Google Maps API |
| PWA | Web App Manifest + Service Worker |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & Run

```bash
# Clone the repo
git clone https://github.com/shura-art/theres-a-reason.git
cd theres-a-reason

# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

### Environment Variables

Create a `.env` file in the project root (optional — app works without it):

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

The map screen uses a stylized fallback when no key is provided. Get a key at [Google Cloud Console](https://console.cloud.google.com/google/maps-apis).

---

## 📁 Project Structure

```
theres-a-reason/
├── public/
│   ├── icons/              # PWA icons
│   ├── manifest.webmanifest
│   └── sw.js               # Service worker (offline cache)
├── src/
│   ├── components/         # Reusable UI components (Avatar, StickerPicker, etc.)
│   ├── pages/              # Screen components (Events, Create, Chat, Map, etc.)
│   ├── context/            # React Context (AppContext — state, storage, events)
│   ├── hooks/              # Custom hooks (useChatExpiry, useNotifications)
│   ├── services/           # Service integrations (googleMaps)
│   ├── data/               # Local data (holidays JSON, stickers, seed data)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── assets/             # UI Kit assets
│   └── styles.css          # Global styles (Tailwind + custom)
├── vercel.json             # Vercel deployment config
├── .github/workflows/      # GitHub Actions CI/CD
└── package.json
```

---

## 📦 Deployment

### Option A: Vercel Git Integration (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Continue with GitHub** and select `theres-a-reason`
3. Vercel auto-detects Vite via `vercel.json` — no manual config needed
4. (Optional) Add `VITE_GOOGLE_MAPS_API_KEY` in **Settings → Environment Variables**
5. Click **Deploy**

Every `git push` to `main` triggers an automatic redeploy.

### Option B: GitHub Actions

The repo includes `.github/workflows/deploy.yml` for CI/CD via Vercel CLI.

Add these secrets in **GitHub → Settings → Secrets and variables → Actions**:

| Secret | Where to get it |
|--------|---------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel → Settings → General |
| `VERCEL_PROJECT_ID` | Vercel → Settings → General |
| `VITE_GOOGLE_MAPS_API_KEY` | [Google Cloud Console](https://console.cloud.google.com/google/maps-apis) |

The workflow builds the project and deploys to Vercel on every push to `main`.

---

## 🎨 UI Kit

The app uses a Pixar-inspired visual style:

- **Fonts:** Nunito (UI) + Fredoka (logo)
- **Colors:** Soft blue, warm sun, rounded corners, soft shadows
- **Assets:** Event icons, participation icons, droplet & chat stickers, avatars
- **Dark mode:** Full dark/light theme support

All visual assets are in `src/assets/ui-kit/`.

---

## 📱 PWA Support

- **Installable** — add to home screen on iOS/Android
- **Offline** — service worker caches app shell and static assets
- **Push notifications** — birthday, new event, chat messages, friend activity
- **Web App Manifest** — standalone display, theme colors, icons

---

## 🔒 Privacy

This is a **non-commercial** app for a private group of ~10–20 friends. All data is stored locally in the browser (localStorage). No backend server required. No external data scraping.

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + production build to `dist/` |
| `npm run preview` | Preview the production build locally |

---

## 📄 License

Private project. Not for commercial use.

---

<div align="center">

**[There's a Reason](https://github.com/shura-art/theres-a-reason)** · Made with ❤️ for friends

</div>
