import { useEffect, useMemo, useState } from "react";
import { BookMarked, Calculator, CalendarDays, Plus, Trash2, Trophy, Clock3 } from "lucide-react";
import { useNotify } from "../context";
const defaultSubjects = [
    { id: 1, name: "Data Structures", credits: 4, grade: "A" },
    { id: 2, name: "Database Systems", credits: 4, grade: "A+" },
    { id: 3, name: "Operating Systems", credits: 3, grade: "B+" },
    { id: 4, name: "Computer Networks", credits: 3, grade: "A" },
    { id: 5, name: "Professional Skills", credits: 2, grade: "O" },
];
const points = { O: 10, "A+": 9, A: 8, "B+": 7, B: 6, C: 5, P: 4, F: 0 };
const read = (key, fallback) => { try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
}
catch {
    return fallback;
} };
const today = new Date();
const dateString = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
export default function AcademicHub() {
    const notify = useNotify();
    const [subjects, setSubjects] = useState(() => read("campusos-grades", defaultSubjects));
    const [history, setHistory] = useState(() => read("campusos-grade-history", []));
    const [exams, setExams] = useState(() => read("campusos-exams", []));
    const [subjectForm, setSubjectForm] = useState({ name: "", credits: "3", grade: "A" });
    const [examForm, setExamForm] = useState({ subject: "", date: "", venue: "" });
    const [semester, setSemester] = useState("Semester 4");
    useEffect(() => localStorage.setItem("campusos-grades", JSON.stringify(subjects)), [subjects]);
    useEffect(() => localStorage.setItem("campusos-grade-history", JSON.stringify(history)), [history]);
    useEffect(() => localStorage.setItem("campusos-exams", JSON.stringify(exams)), [exams]);
    const totals = useMemo(() => {
        const credits = subjects.reduce((sum, item) => sum + Number(item.credits || 0), 0);
        const weighted = subjects.reduce((sum, item) => sum + Number(item.credits || 0) * points[item.grade], 0);
        return { credits, weighted, sgpa: credits ? (weighted / credits).toFixed(2) : "0.00" };
    }, [subjects]);
    const currentSemesterSaved = history.some(item => item.semester.toLowerCase() === semester.trim().toLowerCase());
    const cgpa = useMemo(() => {
        const credits = history.reduce((sum, item) => sum + item.credits, 0) + (currentSemesterSaved ? 0 : totals.credits);
        const weighted = history.reduce((sum, item) => sum + item.sgpa * item.credits, 0) + (currentSemesterSaved ? 0 : Number(totals.sgpa) * totals.credits);
        return credits ? (weighted / credits).toFixed(2) : "0.00";
    }, [history, totals, currentSemesterSaved]);
    const upcoming = useMemo(() => [...exams].sort((a, b) => a.date.localeCompare(b.date)), [exams]);
    function addSubject(event) {
        event.preventDefault();
        if (!subjectForm.name.trim() || Number(subjectForm.credits) < 1 || Number(subjectForm.credits) > 10)
            return notify("Enter a subject and valid credits (1–10)");
        setSubjects(old => [...old, { ...subjectForm, id: Date.now(), name: subjectForm.name.trim(), credits: Number(subjectForm.credits) }]);
        setSubjectForm({ name: "", credits: "3", grade: "A" });
        notify("Subject added to grade calculator");
    }
    function saveSemester() {
        if (!subjects.length || !totals.credits)
            return notify("Add at least one subject first");
        const name = semester.trim() || `Semester ${history.length + 1}`;
        const record = { semester: name, sgpa: Number(totals.sgpa), credits: totals.credits };
        setHistory(old => old.some(item => item.semester.toLowerCase() === name.toLowerCase())
            ? old.map(item => item.semester.toLowerCase() === name.toLowerCase() ? record : item)
            : [...old, record]);
        notify(currentSemesterSaved ? "Saved semester result updated" : "Semester result saved. CGPA updated");
    }
    function addExam(event) {
        event.preventDefault();
        if (!examForm.subject.trim() || !examForm.date)
            return notify("Enter exam subject and date");
        if (examForm.date < dateString(today))
            return notify("Choose today or a future date");
        setExams(old => [...old, { ...examForm, id: Date.now(), subject: examForm.subject.trim() }]);
        setExamForm({ subject: "", date: "", venue: "" });
        notify("Exam added to your planner");
    }
    function daysUntil(date) { return Math.ceil((new Date(`${date}T00:00:00`) - new Date(`${dateString(today)}T00:00:00`)) / 86400000);
}
    return <section className="section academic-hub">
    <div className="page-title">
        <label>ACADEMIC PERFORMANCE SUITE</label>
        <h1>Academic <span style={{ color: "#7051e5" }}>Hub</span>
        </h1>
        <p>Plan exams, calculate grades and track your semester progress in one place.</p>
    </div>
    <div className="stats">
        <div className="stat">
            <span className="stat-icon purple">
                <Calculator size={19}/>
            </span>
            <div>
                <small>Current SGPA</small>
                <strong>{totals.sgpa}</strong>
                <em>Weighted by subject credits</em>
            </div>
        </div>
        <div className="stat">
            <span className="stat-icon blue">
                <Trophy size={19}/>
            </span>
            <div>
                <small>Estimated CGPA</small>
                <strong>{cgpa}</strong>
                <em>Current semester + saved history</em>
            </div>
        </div>
        <div className="stat">
            <span className="stat-icon green">
                <BookMarked size={19}/>
            </span>
            <div>
                <small>Credit points</small>
                <strong>{totals.credits}</strong>
                <em>{subjects.length} subjects in this semester</em>
            </div>
        </div>
        <div className="stat">
            <span className="stat-icon orange">
                <CalendarDays size={19}/>
            </span>
            <div>
                <small>Upcoming exams</small>
                <strong>{upcoming.filter(e => daysUntil(e.date) >= 0).length}</strong>
                <em>In your personal planner</em>
            </div>
        </div>
    </div>
    <div className="two academic-columns">
        <div className="card">
            <div className="card-head">
                <div>
                    <label>GRADE CALCULATOR</label>
                    <h2>Semester performance</h2>
                </div>
                <span className="pill">10-point scale</span>
            </div>
            <div className="grade-note">Change any grade to see your SGPA and estimated CGPA update instantly.</div>
            <div className="grade-table">
                <div className="grade-table-head">
                    <span>Subject</span>
                    <span>Credits</span>
                    <span>Grade</span>
                    <span>Points</span>
                    <span>
                    </span>
                </div>
          {subjects.map(subject =>
                <div className="grade-row" key={subject.id}>
                    <span className="grade-subject">{subject.name}</span>
                    <span>{subject.credits}</span>
                    <select aria-label={`Grade for ${subject.name}`} value={subject.grade} onChange={e => setSubjects(old => old.map(s => s.id === subject.id ? { ...s, grade: e.target.value } : s))}>{Object.keys(points).map(grade =>
                        <option key={grade} value={grade}>{grade}</option>)}</select>
                    <b>{points[subject.grade].toFixed(1)}</b>
                    <button className="icon-button" title={`Remove ${subject.name}`} aria-label={`Remove ${subject.name}`} onClick={() => setSubjects(old => old.filter(s => s.id !== subject.id))}>
                        <Trash2 size={14}/>
                    </button>
                </div>)}
            </div>
            <form className="academic-form" onSubmit={addSubject}>
                <input aria-label="New subject name" placeholder="New subject name" value={subjectForm.name} onChange={e => setSubjectForm({ ...subjectForm, name: e.target.value })} required/>
                    <input aria-label="Credits" type="number" min="1" max="10" value={subjectForm.credits} onChange={e => setSubjectForm({ ...subjectForm, credits: e.target.value })} required/>
                        <select aria-label="New subject grade" value={subjectForm.grade} onChange={e => setSubjectForm({ ...subjectForm, grade: e.target.value })}>{Object.keys(points).map(g =>
                            <option key={g}>{g}</option>)}</select>
                        <button className="primary" type="submit">
                            <Plus size={14}/> Add</button>
                    </form>
                    <div className="sgpa-result">
                        <div>
                            <small>Calculated SGPA</small>
                            <strong>{totals.sgpa}<span>/10</span>
                            </strong>
                        </div>
                        <div>
                            <small>Total credits</small>
                            <strong>{totals.credits}</strong>
                        </div>
                        <div>
                            <small>Weighted points</small>
                            <strong>{totals.weighted.toFixed(1)}</strong>
                        </div>
                    </div>
                    <div className="save-semester">
                        <input aria-label="Semester name" value={semester} onChange={e => setSemester(e.target.value)} placeholder="Semester name"/>
                            <button className="outline" onClick={saveSemester}>{currentSemesterSaved ? "Update saved result" : "Save semester result"}</button>
                        </div>
        {history.length > 0 && <div className="history-list">
                            <b>Saved semester history</b>{history.map(item =>
                            <div key={item.semester}>
                                <span>{item.semester}<small>{item.credits} credits</small>
                                </span>
                                <strong>{item.sgpa.toFixed(2)} SGPA</strong>
                                <button className="icon-button" aria-label={`Remove ${item.semester}`} onClick={() => setHistory(old => old.filter(x => x.semester !== item.semester))}>
                                    <Trash2 size={13}/>
                                </button>
                            </div>)}</div>}
                    </div>
                    <div className="card exam-planner">
                        <div className="card-head">
                            <div>
                                <label>EXAM PLANNER</label>
                                <h2>Stay ahead of exams</h2>
                            </div>
                            <span className="stat-icon orange">
                                <Clock3 size={18}/>
                            </span>
                        </div>
                        <form className="exam-form" onSubmit={addExam}>
                            <label>Subject / exam name<input value={examForm.subject} onChange={e => setExamForm({ ...examForm, subject: e.target.value })} placeholder="e.g. Database Systems" required/>
                                </label>
                                <div className="exam-form-bottom">
                                    <label>Exam date<input type="date" min={dateString(today)} value={examForm.date} onChange={e => setExamForm({ ...examForm, date: e.target.value })} required/>
                                        </label>
                                        <label>Room (optional)<input value={examForm.venue} onChange={e => setExamForm({ ...examForm, venue: e.target.value })} placeholder="e.g. Block B"/>
                                            </label>
                                        </div>
                                        <button className="primary" type="submit">
                                            <Plus size={14}/> Add exam</button>
                                    </form>
                                    <div className="exam-list-head">
                                        <b>Your exam schedule</b>
                                        <span>{upcoming.length} planned</span>
                                    </div>
        {upcoming.length === 0 ? <div className="empty-exams">
                                        <CalendarDays size={25}/>
                                        <b>No exams planned yet</b>
                                        <p>Add your first exam above to see its countdown here.</p>
                                    </div> : upcoming.map(exam => { const days = daysUntil(exam.date); return <div className="exam-item" key={exam.id}>
                                        <div className="exam-date">
                                            <b>{new Date(`${exam.date}T00:00:00`).toLocaleDateString("en-IN", { day: "2-digit" })}</b>
                                            <small>{new Date(`${exam.date}T00:00:00`).toLocaleDateString("en-IN", { month: "short" })}</small>
                                        </div>
                                        <div className="exam-info">
                                            <b>{exam.subject}</b>
                                            <small>{new Date(`${exam.date}T00:00:00`).toLocaleDateString("en-IN", { weekday: "short", year: "numeric" })}{exam.venue ? ` · ${exam.venue}` : ""}</small>
                                        </div>
                                        <span className={days <= 2 ? "countdown urgent" : "countdown"}>{days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${days} days`}</span>
                                        <button className="icon-button" aria-label={`Delete ${exam.subject}`} onClick={() => setExams(old => old.filter(x => x.id !== exam.id))}>
                                            <Trash2 size={13}/>
                                        </button>
                                    </div>; })}
                                </div>
                            </div>
                            <p className="muted">Demo note: grades and exam plans are stored in this browser only. Grade-point mapping is illustrative;
use your university's official grading rules for actual results.</p>
                        </section>;
}
