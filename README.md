<div align="center">

# 🎉 Evaska

**A full-stack event management platform — browse, plan, and book events end-to-end.**

[![Live Site](https://img.shields.io/badge/Live-evaska.vercel.app-black?style=for-the-badge&logo=vercel)](https://evaska.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com)

[Live Demo](https://evaska.vercel.app) · [Report a Bug](https://github.com/swatiiiisiiingh/evaska/issues) · [Request a Feature](https://github.com/swatiiiisiiingh/evaska/issues)

</div>

---

## 📖 About

**Evaska** is a full-stack event management web application built as a personal project. It lets clients browse curated events, design fully custom events through a guided planner, and manage their bookings — all from a single, polished interface. Behind the scenes, a hidden admin layer gives the platform owner complete control over events, bookings, and client communication.

The platform follows a **single-owner architecture**: rather than a multi-vendor marketplace, Evaska is designed around one organizer/admin managing the entire platform, which keeps access control simple and the client experience focused.

---

## ✨ Features

### For Clients
- 🔐 **Google Sign-In** via Firebase Authentication — no separate signup flow
- 🗓️ **Event Browsing** — explore curated, ready-to-book events
- 🎨 **4-Step Custom Event Planner** — choose from 8 event types, each with 8 curated themes and 30+ decor options
- ✅ **RSVP & Booking** — book events with a streamlined cancellation flow
- 👤 **Profile Dashboard** — a 5-tab dashboard covering bookings, custom event requests, notifications, and account details
- 🔔 **Real-Time Notifications** — synced instantly between admin actions and the client's profile
- 💾 **Persistent Sessions** — full app state restored on reload via `localStorage` + React Context

### For the Admin (Hidden Layer)
- 🕵️ **Invisible from Public Navigation** — no visible admin link or role indicator anywhere in the client UI
- 🔑 **Secret URL + Password Gate** — admin routes are only reachable via a private URL, protected further by a password check
- 🛡️ **Middleware-Enforced Access Control** — Next.js middleware + cookie-based auth guards every admin route at the edge
- 📋 **Full Event & Booking Management** — approve, edit, or cancel events and client bookings
- 📣 **Client Notification Triggers** — admin actions push real-time updates straight to client dashboards

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) (`@theme` directive, no `tailwind.config.js`) |
| **Authentication** | [Firebase Authentication](https://firebase.google.com/products/auth) (Google Sign-In) |
| **State & Persistence** | React Context API + `localStorage` |
| **Access Control** | Next.js Middleware + secret-URL routing + cookie auth |
| **Hosting** | [Vercel](https://vercel.com) |
| **Version Control** | [GitHub](https://github.com/swatiiiisiiingh/evaska) |

---

## 🏗️ Architecture Notes

- **Single-owner model:** Evaska was originally scoped as a multi-organizer marketplace, then deliberately restructured mid-development into a single-owner platform. This pivot simplified access control and sharpened the client-facing UX.
- **Tailwind v4:** Styling uses the new `@theme` directive directly in CSS rather than a `tailwind.config.js` file — a notable departure from Tailwind v3 conventions.
- **Admin security:** There is no role flag or admin indicator anywhere in the public-facing app. Admin access requires knowing the secret URL, and is further gated by middleware + a cookie-authenticated password check.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm / bun
- A [Firebase](https://console.firebase.google.com) project with Authentication (Google provider) enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/swatiiiisiiingh/evaska.git
cd evaska

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Admin access
ADMIN_SECRET_PATH=your_secret_admin_route
ADMIN_PASSWORD=your_admin_password
```

> ⚠️ After deploying, remember to add your production domain (e.g. `evaska.vercel.app`) to **Firebase Console → Authentication → Settings → Authorized domains**, or Google Sign-In will fail in production.

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📁 Project Structure

```
evaska/
├── app/                  # Next.js App Router pages & layouts
│   ├── (client)/         # Public-facing client routes
│   ├── [admin-secret]/   # Hidden admin routes (middleware-protected)
│   └── api/               # Route handlers
├── components/           # Reusable UI components
├── context/               # React Context (AppContext) for global state
├── lib/                  # Firebase config, helpers, utilities
├── middleware.ts         # Admin route protection
└── public/                # Static assets
```

---

## 🌐 Deployment

Evaska is deployed on **Vercel** with automatic deployments on every push to `main`.

**Live:** [https://evaska.vercel.app](https://evaska.vercel.app)

To deploy your own instance:

1. Push your fork to GitHub
2. Import the repo into [Vercel](https://vercel.com/new)
3. Add the environment variables listed above
4. Add your Vercel domain to Firebase's authorized domains
5. Deploy 🚀

---

## 📄 License

This is a personal project. All rights reserved unless otherwise specified.

---

<div align="center">

Built with ❤️ by [Swati Singh](https://github.com/swatiiiisiiingh)

</div>
