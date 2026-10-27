# Project 2 implementation audit

| Requirement | Implemented in |
|---|---|
| Academic Hub | `src/pages/AcademicHub.jsx`: credit-weighted SGPA/CGPA, semester history, exam planner and countdowns (localStorage demo) |
| React components and reusable UI | `src/components/` including `FormField.jsx`, `EventCard.jsx`, `BookCard.jsx`, `StatCard.jsx`, `SectionTitle.jsx` |
| SPA and React Router | `src/main.jsx`, `src/App.jsx` |
| Meaningful `useState` | Search/filter/sort/form/modal/loading/error/theme/favorites-adjacent UI state across pages |
| `useEffect` | `src/context.jsx` loads shared profile; Dashboard and API pages load backend resources on mount |
| Context API for shared state | `src/context.jsx`: shared profile, theme and notifications |
| Local vs global state | Local page forms and filters; shared profile/theme/toasts in Context; favorite IDs in Zustand |
| Zustand | `src/store/favorites.js`, consumed by `src/pages/Library.jsx` |
| REST API / Fetch | `src/utils/api.js`, base URL `http://localhost:3001` |
| Matching API resources | `db.json`: `events`, `lostfound`, `marketplace`, `library`, `profile` |
| CRUD | Lost & Found and Marketplace support POST, GET, PATCH, DELETE |
| API loading/error/empty handling | Dashboard, Events, Library, Lost & Found, Marketplace and Profile |
| Form validation | Lost & Found, Marketplace and Profile forms |
| Reusable input | `src/components/FormField.jsx`, used in Marketplace |
| Modal | Event details modal in `src/pages/Events.jsx` |
| Tabs | Event category tabs in Events; Preferences/Account/About tabs in Settings; Browse/Offer tabs in Skill Exchange |
| Dropdowns | Event categories, product category/price sorting, Lost & Found type, Library filter |
| Notifications | `useNotify` in `src/context.jsx`, used for registration, CRUD, favorites and settings |
| Search/filter/sort | Events, Lost & Found, Marketplace, Library, Placement demo, Skill Exchange demo |
| Responsive styling | `src/styles/global.css` media queries and mobile layout rules |
| Dashboard summaries from API | `src/pages/Dashboard.jsx` loads events, library, Lost & Found and Marketplace |

## Verification status
- JSX/JavaScript syntax parsing: passed for all 25 source `.js`/`.jsx` files.
- Relative source imports: all resolved.
- `db.json` resource keys: match the five configured API resources.
- Production build: not verified. The environment's copied `node_modules` came from a different platform and Vite 8/Rolldown failed due a missing native binding; dependency installation timed out here. `package.json` is pinned to Vite 5 / React 18 to avoid the Rolldown issue. On the Mac, run `npm install`, then `npm run build`.

## Advanced CampusOS modules (added in the enhanced build)
- `src/pages/Attendance.jsx`: per-subject attendance percentages, target threshold warnings, estimated classes needed to recover, present/absent controls, add/remove subjects, browser persistence.
- `src/pages/Timetable.jsx`: weekday schedule, sorted class timeline, room details, lecture/lab/tutorial types, add/remove classes, time validation and browser persistence.
- `src/pages/CampusAssistant.jsx`: interactive student-help chat with suggested prompts and navigation shortcuts. It uses transparent built-in rules and does not claim to be a live AI model.
- Added sidebar navigation and React Router routes for all three modules.
