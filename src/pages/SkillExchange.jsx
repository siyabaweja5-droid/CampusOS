import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { useNotify } from "../context";
const starterSkills = [{ id: 1, name: "React basics", offeredBy: "Aarav", wants: "UI design" }, { id: 2, name: "Figma prototyping", offeredBy: "Mehak", wants: "JavaScript" }];
export default function SkillExchange() {
    const [skills, setSkills] = useState(starterSkills);
    const [name, setName] = useState("");
    const [offeredBy, setOfferedBy] = useState("");
    const [wants, setWants] = useState("");
    const [tab, setTab] = useState("browse");
    const [search, setSearch] = useState("");
    const notify = useNotify();
    function submit(event) { event.preventDefault();
if (!name.trim() || !offeredBy.trim() || !wants.trim())
        return;
setSkills(current => [{ id: Date.now(), name: name.trim(), offeredBy: offeredBy.trim(), wants: wants.trim() }, ...current]);
setName("");
setOfferedBy("");
setWants("");
setTab("browse");
notify("Your skill offer was added to this session.");
}
    const visible = skills.filter(skill => `${skill.name} ${skill.offeredBy} ${skill.wants}`.toLowerCase().includes(search.toLowerCase()));
    return <main className="section">
    <SectionTitle label="STUDENT COMMUNITY" title="Skill Exchange" text="Share a skill and find a student to learn with."/>
    <div className="tabs">
        <button className={tab === "browse" ? "active" : ""} onClick={() => setTab("browse")}>Browse skills</button>
        <button className={tab === "offer" ? "active" : ""} onClick={() => setTab("offer")}>Offer a skill</button>
    </div>
    {tab === "offer" ? <form className="card form-card" onSubmit={submit}>
        <h2>Offer a skill</h2>
        <label>Skill you can teach *<input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Python basics"/>
            </label>
            <label>Your name *<input value={offeredBy} onChange={e => setOfferedBy(e.target.value)} required/>
                </label>
                <label>Skill you want to learn *<input value={wants} onChange={e => setWants(e.target.value)} required placeholder="e.g. UI design"/>
                    </label>
                    <button className="primary">Add skill offer</button>
                </form> : <>
                <div className="toolbar">
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skills or student names"/>
                    </div>
                    <div className="simple-grid">{visible.map(skill =>
                        <article className="card item-card" key={skill.id}>
                            <span className="pill">Skill exchange</span>
                            <h3>{skill.name}</h3>
                            <p>Offered by {skill.offeredBy}</p>
                            <small>Interested in learning: {skill.wants}</small>
                            <div className="actions">
                                <button className="outline" onClick={() => notify(`You expressed interest in ${skill.name}. Contact ${skill.offeredBy} through campus channels.`)}>I'm interested</button>
                            </div>
                        </article>)}</div>{!visible.length && <div className="card empty-state">No matching skills found.</div>}</>}</main>;
}
