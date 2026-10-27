# CampusOS — Smart Campus Student Portal

## Run the project
Use two terminals in this folder. Keep both running.

**Terminal 1 — API**
```bash
npm install
npm run api
```
The API uses JSON Server on `http://localhost:3001` and reads `db.json`.

**Terminal 2 — React frontend**
```bash
npm run dev
```
Open the local URL Vite prints (normally `http://localhost:5173`).

If the browser says it cannot reach the API, check that Terminal 1 is still running and that `http://localhost:3001/events` returns JSON. Do not start Vite and JSON Server in the same terminal.

## What is implemented
- React + Vite single-page application with React Router routes in `src/App.jsx`.
- Shared Context API state in `src/context.jsx`: student profile, theme and notifications. The profile is loaded from the API; API errors are not replaced with pretend profile data.
- Local UI/form state via `useState`; API loading via `useEffect`.
- Zustand store in `src/store/favorites.js` for Library favorites (kept separate from Context state).
- One shared Fetch API helper in `src/utils/api.js` for consistent endpoints and readable HTTP/network errors.
- Dashboard reads events, books, Lost & Found and Marketplace from the API and shows loading/error/empty states.
- Events: API read, register/unregister (PATCH), text search, category tabs/filter, date sorting and details modal.
- Lost & Found: API-backed create/read/update/delete, validation, search and Lost/Found filter.
- Marketplace: API-backed create/read/update/delete, validation, search and price sorting.
- Library: API-backed book list, search, availability/favorites filter and Zustand favorites.
- Profile: API-backed editing, validation and shared profile state.
- Settings: functional tabs, theme toggle and links to account preferences.
- Header quick navigation/search, notification action, interactive campus map pins, and small working demo flows on Placement and Skill Exchange pages.
- Reusable components include `FormField`, `SectionTitle`, `EventCard`, `BookCard`, `StatCard`, and navigation/cards.

## Viva file guide
- `src/main.jsx`: React entry point, BrowserRouter and global Context provider.
- `src/App.jsx`: route definitions and page layout.
- `src/context.jsx`: Context API, global profile/theme and toast notification state.
- `src/store/favorites.js`: Zustand global favorite IDs.
- `src/utils/api.js`: REST/Fetch helper and error handling.
- `src/pages/Dashboard.jsx`: useEffect + Promise.all API loading and summary cards.
- `src/pages/Events.jsx`: useState/useEffect, search/filter/sort, modal and PATCH registration.
- `src/pages/LostAndFound.jsx`: CRUD and form validation.
- `src/pages/Marketplace.jsx`: CRUD, reusable FormField and price sorting.
- `src/pages/Library.jsx`: Zustand favorites and filtering.
- `src/pages/Profile.jsx`: editable local draft saved to shared Context after API success.
- `src/pages/Settings.jsx`: tabs and global theme state.
- `db.json`: local demo records used by JSON Server.

## Implementation notes
The Dashboard's attendance, assignments and credits remain example UI figures; event counts, book lists, Lost & Found items, marketplace highlights and profile are loaded from the local API. Placement opportunities and Skill Exchange starter offers are explicitly small in-session demo features, not connected to a remote service.

## Verification
All source `.js`/`.jsx` files were checked for JSX/JavaScript parse errors with the TypeScript parser. A production `npm run build` could not be completed in the provided Linux environment because the bundled dependencies from the original archive contain a platform-specific Vite/Rolldown native binding; dependency installation also timed out in this environment. The package versions are pinned to a stable Vite 5 / React 18 combination to avoid pulling the latest Rolldown-based Vite. Please run `npm install` and `npm run build` on your Mac if you need the local production-build check.


## Advanced student modules
- **Attendance Intelligence:** editable subject attendance, threshold warnings and recovery estimate.
- **Timetable:** personal weekly class planner.
- **Campus Assistant:** rule-based campus FAQ demo with quick shortcuts.
- **Academic Hub:** weighted SGPA/estimated CGPA calculator, saved semester history and exam countdown planner.

Academic Hub, Attendance and Timetable use browser localStorage for demo data. They are not connected to an official college ERP; grade points are illustrative and should be adjusted to your university rules.
