# World Soccer Teams Tracker

A free, kid-friendly web app for browsing starter national soccer team profiles.

The app shows each country's flag, FIFA code, FIFA ranking, captain, top goal scorer, and most recent match. It works with local demo match data by default and can optionally use the API-Football free tier for live match updates.

## Current Stage

This version adds the first feedback loop:

- Thumbs-down feedback on every team card and detail page
- A correction form for ranking, captain, top scorer, goals, recent match, or other issues
- Local saved feedback so the child can see what they reported
- A server route at `/api/feedback` that validates and accepts correction reports
- Source notes for the ranking update and all-time scoring data

## Tech Stack

- Next.js with App Router
- TypeScript
- Tailwind CSS
- Local seed data with an optional server-only API integration

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:3000`.

## Optional API-Football Key

The app works without an API key by using local demo match data.

To enable live recent-match updates:

1. Create a free API-Football account.
2. Copy `.env.local.example` to `.env.local`.
3. Add your key:

```bash
API_FOOTBALL_KEY=your_key_here
```

All API-Football calls happen through the server route at `/api/team/[id]`, so the key is not exposed in the browser. Responses are cached for at least 6 hours to avoid wasting free-tier requests.

## Data Notes

- FIFA rankings are seeded from the FIFA/Coca-Cola Men's World Ranking update published on 11 June 2026.
- Profile details are local seed data and should continue to be reviewed as squads and captains change.
- Feedback submissions are validated by the app and logged by the server route, but there is no database yet.

## Build

```bash
npm run build
```

## Deploy

### Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add `API_FOOTBALL_KEY` as an environment variable only if you want live updates.
4. Deploy.

### Netlify

1. Push the project to GitHub.
2. Import the repository into Netlify.
3. Use `npm run build` as the build command.
4. Use Netlify's Next.js support.
5. Add `API_FOOTBALL_KEY` as an environment variable only if needed.

## Current Limitations

- The starter list has 10 countries only.
- Feedback is not connected to a permanent database yet.
- Rankings, captains, and scorer totals should still be reviewed periodically.
- Without an API key, recent matches use local demo data.
- There is no login, payments, ads, notifications, or full country catalog yet.

## Live Deployment

The production app is deployed on Vercel.
