import { useMemo, useState } from "react";
import { CalendarDays, Clock3, MapPin, Plus } from "lucide-react";
import { useNotify } from "../context";
const initial = [
    { id: 1, day: "Monday", start: "09:00", end: "10:00", subject: "Data Structures & Algorithms", code: "CS301", room: "Block A · 204", type: "Lecture" },
    { id: 2, day: "Monday", start: "10:15", end: "11:15", subject: "Database Management Systems", code: "CS302", room: "Block B · 101", type: "Lecture" },
    { id: 3, day: "Tuesday", start: "11:30", end: "13:00", subject: "Operating Systems Lab", code: "CS303L", room: "Computing Lab 2", type: "Lab" },
    { id: 4, day: "Wednesday", start: "09:00", end: "10:00", subject: "Computer Networks", code: "CS304", room: "Block A · 301", type: "Lecture" },
    { id: 5, day: "Thursday", start: "13:30", end: "14:30", subject: "Professional Communication", code: "HU301", room: "Seminar Hall", type: "Tutorial" },
    { id: 6, day: "Friday", start: "10:15", end: "11:15", subject: "Database Management Systems", code: "CS302", room: "Block B · 101", type: "Lecture" },
];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export default function Timetable() { const [classes, setClasses] = useState(() => { try {
    return JSON.parse(localStorage.getItem("campusos-timetable")) || initial;
}
catch {
    return initial;
} });
const [day, setDay] = useState("Monday");
const [form, setForm] = useState({ day: "Monday", start: "09:00", end: "10:00", subject: "", code: "", room: "", type: "Lecture" });
const notify = useNotify();
const sorted = useMemo(() => classes.filter(c => c.day === day).sort((a, b) => a.start.localeCompare(b.start)), [classes, day]);
function persist(next) { setClasses(next);
localStorage.setItem("campusos-timetable", JSON.stringify(next));
} function add(e) { e.preventDefault();
if (form.end <= form.start)
    return notify("End time must be after start time");
persist([...classes, { ...form, id: Date.now() }]);
setDay(form.day);
setForm({ ...form, subject: "", code: "", room: "" });
notify("Class added to timetable");
} return <section className="section">
    <div className="page-title">
        <label>YOUR ACADEMIC WEEK</label>
        <h1>Smart <span style={{ color: "#7051e5" }}>Timetable</span>
        </h1>
        <p>Plan lectures and labs in one place. Select a day to view your schedule.</p>
    </div>
    <div className="stats">
        <div className="stat">
            <span className="stat-icon purple">
                <CalendarDays size={19}/>
            </span>
            <div>
                <small>Scheduled classes</small>
                <strong>{classes.length}</strong>
                <em>Weekly timetable</em>
            </div>
        </div>
        <div className="stat">
            <span className="stat-icon blue">
                <Clock3 size={19}/>
            </span>
            <div>
                <small>Selected day</small>
                <strong>{sorted.length}</strong>
                <em>{day}</em>
            </div>
        </div>
        <div className="stat">
            <span className="stat-icon green">
                <MapPin size={19}/>
            </span>
            <div>
                <small>Campus-ready</small>
                <strong>Rooms</strong>
                <em>Room details included</em>
            </div>
        </div>
        <div className="stat">
            <span className="stat-icon orange">
                <CalendarDays size={19}/>
            </span>
            <div>
                <small>Class types</small>
                <strong>3</strong>
                <em>Lecture · Lab · Tutorial</em>
            </div>
        </div>
    </div>
    <div className="card">
        <div className="card-head">
            <div>
                <label>WEEKLY SCHEDULE</label>
                <h2>Class timeline</h2>
            </div>
            <span className="pill">Editable demo</span>
        </div>
        <div className="tabs">{days.map(d =>
            <button key={d} className={day === d ? "active" : ""} onClick={() => setDay(d)}>{d.slice(0, 3)}</button>)}</div>{sorted.length ? sorted.map(c =>
        <div className="timetable-row" key={c.id}>
            <div className="time-block">
                <b>{c.start}</b>
                <small>{c.end}</small>
            </div>
            <div className="timetable-bar">
                <span className={`timetable-dot ${c.type.toLowerCase()}`}/>
                <div>
                    <b>{c.subject}</b>
                    <small>{c.code} · {c.type}</small>
                    <small>
                        <MapPin size={12} style={{ verticalAlign: "middle" }}/> {c.room}</small>
                </div>
                <button className="outline" onClick={() => { persist(classes.filter(x => x.id !== c.id)); notify("Class removed"); }}>Remove</button>
            </div>
        </div>) : <div className="empty-state">No classes on {day}. Enjoy the free time or add a class below.</div>}</div>
    <form className="card form-card" onSubmit={add}>
        <h2>
            <Plus size={18} style={{ verticalAlign: "middle" }}/> Add a class</h2>
        <div className="form-grid">
            <label>Day<select value={form.day} onChange={e => setForm({ ...form, day: e.target.value })}>{days.map(d =>
                    <option key={d}>{d}</option>)}</select>
            </label>
            <label>Class type<select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                    <option>Lecture</option>
                    <option>Lab</option>
                    <option>Tutorial</option>
                </select>
            </label>
            <label>Subject<input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Subject name"/>
                </label>
                <label>Subject code<input required value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="CS301"/>
                    </label>
                    <label>Start time<input required type="time" value={form.start} onChange={e => setForm({ ...form, start: e.target.value })}/>
                        </label>
                        <label>End time<input required type="time" value={form.end} onChange={e => setForm({ ...form, end: e.target.value })}/>
                            </label>
                            <label>Room / location<input required value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} placeholder="Block A · Room 204"/>
                                </label>
                            </div>
                            <button className="primary" type="submit">Save to timetable</button>
                        </form>
                        <p className="muted">Demo note: timetable is saved locally in this browser, not synced with your college ERP.</p>
                    </section>;
}
