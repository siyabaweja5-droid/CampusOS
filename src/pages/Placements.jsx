import { useState } from "react";
import { Building2, Search, CheckCircle2 } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { useNotify } from "../context";
const opportunities = [
    { id: 1, company: "Microsoft", role: "Software Engineer Intern", type: "Internship", status: "Applications open" },
    { id: 2, company: "Infosys", role: "Systems Engineer", type: "Full-time", status: "Campus drive" },
    { id: 3, company: "Adobe", role: "Frontend Engineering Intern", type: "Internship", status: "Applications open" },
];
export default function Placements() {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("All");
    const [saved, setSaved] = useState([]);
    const notify = useNotify();
    const visible = opportunities.filter(item => (filter === "All" || item.type === filter) && `${item.company} ${item.role}`.toLowerCase().includes(query.toLowerCase()));
    function toggle(id) { setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
notify(saved.includes(id) ? "Opportunity removed from saved list." : "Opportunity saved for review.");
}
    return <main className="section">
    <SectionTitle label="CAREER CENTRE" title="Placement Dashboard" text="Explore sample campus opportunities and save roles to discuss with your placement cell."/>
    <p className="muted">Demo listings for frontend evaluation;
no external application is submitted.</p>
    <div className="toolbar">
        <div className="large-search">
            <Search size={16}/>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search company or role"/>
            </div>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option>All</option>
                <option>Internship</option>
                <option>Full-time</option>
            </select>
        </div>
        <div className="simple-grid">{visible.map(item =>
            <article className="card item-card" key={item.id}>
                <Building2 />
                <span className="pill">{item.type}</span>
                <h3>{item.company}</h3>
                <p>{item.role}</p>
                <small>{item.status}</small>
                <div className="actions">
                    <button className="primary" onClick={() => toggle(item.id)}>{saved.includes(item.id) ? "✓ Saved" : "Save opportunity"}</button>
                </div>
            </article>)}</div>{!visible.length && <div className="card empty-state">No opportunities match your search.</div>}
        <div className="card" style={{ marginTop: 16 }}>
            <CheckCircle2 />
            <b> Saved opportunities: {saved.length}</b>
        </div>
    </main>;
}
