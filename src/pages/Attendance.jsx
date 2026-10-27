import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, TrendingUp, Plus, Trash2 } from "lucide-react";
import { useNotify } from "../context";
const starter = [
    { id: 1, subject: "Data Structures & Algorithms", code: "CS301", attended: 22, total: 25, target: 75 },
    { id: 2, subject: "Database Management Systems", code: "CS302", attended: 19, total: 24, target: 75 },
    { id: 3, subject: "Operating Systems", code: "CS303", attended: 17, total: 23, target: 75 },
    { id: 4, subject: "Computer Networks", code: "CS304", attended: 21, total: 22, target: 75 },
];
function readAttendance() { try {
    return JSON.parse(localStorage.getItem("campusos-attendance")) || starter;
}
catch {
    return starter;
} }
export default function Attendance() {
    const [subjects, setSubjects] = useState(readAttendance);
    const [form, setForm] = useState({ subject: "", code: "", attended: "0", total: "0", target: "75" });
    const notify = useNotify();
    useEffect(() => { localStorage.setItem("campusos-attendance", JSON.stringify(subjects)); }, [subjects]);
    const overall = useMemo(() => { const a = subjects.reduce((n, s) => n + s.attended, 0); const t = subjects.reduce((n, s) => n + s.total, 0); return { a, t, p: t ? Math.round(a / t * 100) : 0 }; }, [subjects]);
    function mark(id, present) { setSubjects(old => old.map(s => s.id === id ? { ...s, total: s.total + 1, attended: s.attended + (present ? 1 : 0) } : s));
notify(present ? "Attendance marked present" : "Attendance marked absent");
}
    function addSubject(e) { e.preventDefault();
if (!form.subject.trim() || !form.code.trim())
        return notify("Enter subject name and code");
const total = Math.max(0, Number(form.total) || 0), attended = Math.max(0, Math.min(total, Number(form.attended) || 0));
setSubjects(old => [...old, { ...form, id: Date.now(), attended, total, target: Number(form.target) || 75 }]);
setForm({ subject: "", code: "", attended: "0", total: "0", target: "75" });
notify("Subject added successfully");
}
    return <section className="section">
    <div className="page-title">
        <label>ACADEMIC TRACKER</label>
        <h1>Attendance <span style={{ color: "#7051e5" }}>Intelligence</span>
        </h1>
        <p>Track attendance, spot low-attendance subjects and plan your next classes.</p>
    </div>
    <div className="stats">
        <div className="stat">
            <span className="stat-icon purple">
                <TrendingUp size={19}/>
            </span>
            <div>
                <small>Overall attendance</small>
                <strong>{overall.p}%</strong>
                <em>{overall.a} of {overall.t} classes attended</em>
            </div>
        </div>
        <div className="stat">
            <span className="stat-icon green">
                <CheckCircle2 size={19}/>
            </span>
            <div>
                <small>Subjects tracked</small>
                <strong>{subjects.length}</strong>
                <em>Across your semester</em>
            </div>
        </div>
        <div className="stat">
            <span className="stat-icon orange">
                <AlertTriangle size={19}/>
            </span>
            <div>
                <small>Below target</small>
                <strong>{subjects.filter(s => s.total && s.attended / s.total * 100 < s.target).length}</strong>
                <em>Need your attention</em>
            </div>
        </div>
        <div className="stat">
            <span className="stat-icon blue">
                <CheckCircle2 size={19}/>
            </span>
            <div>
                <small>Target percentage</small>
                <strong>75%</strong>
                <em>Recommended minimum</em>
            </div>
        </div>
    </div>
    <div className="card">
        <div className="card-head">
            <div>
                <label>SUBJECT OVERVIEW</label>
                <h2>Your attendance record</h2>
            </div>
            <span className="pill">Live local tracker</span>
        </div>
      {subjects.map(s => { const p = s.total ? Math.round(s.attended / s.total * 100) : 0; const safe = p >= s.target; const needed = safe ? 0 : Math.ceil((s.target * s.total - s.attended * 100) / (100 - s.target)); return <div className="attendance-row" key={s.id}>
            <div className="attendance-main">
                <div>
                    <b>{s.subject}</b>
                    <small>{s.code} · Target {s.target}%</small>
                </div>
                <strong className={safe ? "good-text" : "warning-text"}>{p}%</strong>
            </div>
            <div className="progress-track">
                <span style={{ width: `${Math.min(100, p)}%`, background: safe ? "#32a56a" : "#e69a38" }}/>
            </div>
            <div className="attendance-foot">
                <small>{s.attended}/{s.total} classes attended {s.total > 0 && !safe ? `· Attend next ${needed} class${needed === 1 ? "" : "es"} to reach target` : safe ? "· Target met" : "· Mark your first class"}</small>
                <div className="attendance-actions">
                    <button className="outline" onClick={() => mark(s.id, true)}>+ Present</button>
                    <button className="outline" onClick={() => mark(s.id, false)}>+ Absent</button>
                    <button className="icon-button" title="Remove subject" onClick={() => setSubjects(old => old.filter(x => x.id !== s.id))}>
                        <Trash2 size={15}/>
                    </button>
                </div>
            </div>
        </div>; })}
    </div>
    <form className="card form-card" onSubmit={addSubject}>
        <h2>
            <Plus size={18} style={{ verticalAlign: "middle" }}/> Add a subject</h2>
        <div className="form-grid">
            <label>Subject name<input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="e.g. Computer Networks" required/>
                </label>
                <label>Subject code<input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="e.g. CS305" required/>
                    </label>
                    <label>Classes attended<input type="number" min="0" value={form.attended} onChange={e => setForm({ ...form, attended: e.target.value })}/>
                        </label>
                        <label>Total classes<input type="number" min="0" value={form.total} onChange={e => setForm({ ...form, total: e.target.value })}/>
                            </label>
                        </div>
                        <button className="primary" type="submit">Add subject</button>
                    </form>
                    <p className="muted">Demo note: attendance changes are saved in this browser using local storage. They are not connected to official college records.</p>
                </section>;
}
