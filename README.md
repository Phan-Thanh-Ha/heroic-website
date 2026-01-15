# Heroic Website

React + TypeScript frontend for an ecommerce experience. Includes home, category,
product detail, cart, checkout flow, and authentication (email/OTP, Google).

## Features

- Home, category, product detail pages
- Cart and checkout UI
- Auth flow with email/OTP and Google
- Address selection (province/district/ward)

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS + shacn UI
- MobX state management
- React Hook Form + Zod

## Requirements

- Node.js 18+ (recommended)
- Yarn or npm

## Setup

1. Install dependencies:
   - `yarn` or `npm install`
2. Create env file:
   - Copy `env.example` to `.env` and fill values
3. Start dev server:
   - `yarn dev` or `npm run dev`

## Environment Variables

Create `.env` from `env.example`:

```
VITE_API_URL=https://api.example.com
VITE_NAMESPACE=heroic
VITE_GG_CLIENT_ID=your-google-client-id
VITE_APP_NAME=Heroic
VITE_FB_APP_ID=your-facebook-client-id
VITE_BANK_NAME=Your Bank
VITE_ACCOUNT_NUMBER_BANK=0000000000
```

## Scripts

- `dev` - start Vite dev server
- `build` - typecheck + build
- `preview` - preview production build
- `lint` - run ESLint

