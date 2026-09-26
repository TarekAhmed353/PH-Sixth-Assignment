# FitLog

A dark, no-nonsense workout library built with Next.js. Browse twelve lifts, open any of them for sets, reps and step-by-step instructions, then build a plan for today and keep a list of lifts to try later.

**Live site:** https://fitlog-tarek.vercel.app
**Repository:** https://github.com/TarekAhmed353/PH-Sixth-Assignment

## Features

- Workout library with 12 lifts from the FitLog API, shown as cards with muscle group tags, equipment, duration, calories and rating
- A details page for every workout, with a specs panel and numbered instructions
- Today's plan with a cap of five lifts. The Add button locks once the plan is full
- A Save for later list, kept separate from today's plan
- Live stats on the My Plan page that add up exercises, minutes and calories as the plan changes
- Sort the plan by duration, calories or rating
- Mark lifts as done or remove them, with a toast for every action
- Plan and saved lists are stored in localStorage, so they survive a page reload
- Navbar badges showing how many lifts are in the plan and the saved list
- A loading spinner while workouts are fetched, a custom 404 page, and a layout that works on phone, tablet and desktop
- If the API is down or rate limited, the app falls back to a local copy of the workout data

## Tech stack

- Next.js 16 (App Router) with React and TypeScript
- Tailwind CSS 4 and daisyUI 5
- react-hot-toast for notifications
- lucide-react for icons
- next/font with Oswald and Inter
- Deployed on Vercel

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero and the workout library |
| `/workout/[id]` | Details for one workout |
| `/my-plan` | Today's plan and saved lifts |
| Any other URL | Custom 404 page |

## Running it locally

```bash
git clone https://github.com/TarekAhmed353/PH-Sixth-Assignment.git
cd PH-Sixth-Assignment
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
src/
├── app/
│   ├── page.tsx            Home page
│   ├── my-plan/page.tsx    My Plan page
│   ├── workout/[id]/       Workout details page
│   ├── not-found.tsx       404 page
│   └── layout.tsx          Navbar, footer and shared state
├── components/             Navbar, Hero, cards, loader and page views
├── context/PlanContext.tsx Plan and saved lists, stored in localStorage
└── lib/                    API helpers, types and fallback data
```