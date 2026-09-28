# flowdy

A focus timer and to-do list for students, with a Minecraft-inspired look: pixel typography, squared buttons, a slowly spinning pixel Earth behind the timer, and a drifting starfield.

Use it as a stopwatch, or click the timer to pick a countdown (15, 25, 30, 40, 45 minutes, or any custom length) and work through your tasks while the world turns.

> The interface text is in Spanish.

## Features

- **Stopwatch and countdown modes.** Counts up by default. Click the timer (while paused) to set a countdown.
- **To-do list.** Up to 6 tasks in two columns on desktop, 3 on mobile.
- **Animated background.** A spinning pixel Earth over a twinkling, drifting starfield.
- **Responsive.** Phone layout and a wider desktop layout.

## Tech stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend:** Python, FastAPI (not connected to the frontend yet)
- **Font:** Iosevka Charon

## Project structure

```
flowdy/
├── frontend/    # Next.js app (timer, world, to-do list)
├── backend/     # FastAPI API
├── LICENSES.md
└── README.md
```

## Getting started

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

**Backend**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```

API docs at http://localhost:8000/docs.

## Credits

- **Earth animation:** "Build the Earth" by [BuildTheEarth](https://commons.wikimedia.org/wiki/File:Build_the_Earth.gif), © 2023 BuildTheEarth, MIT License.
- **Font:** [Iosevka Charon](https://github.com/be5invis/Iosevka), SIL Open Font License 1.1.

Full license texts are in [LICENSES.md](./LICENSES.md).