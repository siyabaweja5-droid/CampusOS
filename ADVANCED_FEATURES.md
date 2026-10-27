# CampusOS — Advanced feature guide

## Added modules

### 1. Attendance Intelligence
- Shows an overall attendance percentage and subject-by-subject progress.
- Warns when attendance is below the selected target (default 75%).
- Calculates an estimate of how many consecutive classes are needed to reach the target.
- Mark a class Present or Absent, add a subject, or remove a subject.
- Data persists in browser local storage for the current browser.

### 2. Smart Timetable
- Switch between Monday–Saturday.
- View sorted classes, time range, subject code, class type and room.
- Add and remove classes; prevents an end time earlier than or equal to the start time.
- Data persists in browser local storage for the current browser.

### 3. Campus Assistant
- Interactive chat UI with quick prompts and campus navigation shortcuts.
- Gives built-in guidance for attendance, events, library, placements, campus map, Lost & Found and Marketplace.
- This is a rule-based demo assistant, not a live LLM/API integration.

## Run locally
1. Open the project folder in Terminal.
2. Run `npm install`.
3. In Terminal tab 1, run `npm run api` (JSON Server on port 3001).
4. In Terminal tab 2, run `npm run dev` (Vite on port 5173).
5. Open the local Vite URL printed in the terminal.

The API-backed pages use `db.json`. The attendance and timetable demo modules use browser local storage and are not connected to official university records.


## Academic Hub (added in advanced build)
- Grade-point calculator with credit-weighted SGPA and estimated CGPA.
- Save semester results and maintain a local semester history.
- Exam planner with date validation, countdown labels, optional venue and delete actions.
- Data is stored in browser localStorage; grade-point mapping is illustrative and should be aligned with the university's official scheme.
