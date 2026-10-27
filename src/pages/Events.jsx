import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { apiRequest } from "../utils/api";
import { useNotify } from "../context";
export default function Events() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("soonest");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const notify = useNotify();
    async function load() {
        setLoading(true);
        setError("");
        try {
            setEvents(await apiRequest("events"));
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => { load(); }, []);
    async function register(event) {
        try {
            const updated = { registered: !event.registered };
            await apiRequest("events", { method: "PATCH", id: event.id, body: updated });
            setEvents(current => current.map(item => item.id === event.id ? { ...item, ...updated } : item));
            setSelectedEvent(current => current && current.id === event.id ? { ...current, ...updated } : current);
            notify(event.registered ? "Registration cancelled." : `Registered for ${event.title}.`);
        }
        catch (e) {
            setError(e.message);
        }
    }
    const visible = events.filter(event => (category === "All" || event.category === category) &&
        `${event.title} ${event.description} ${event.location}`.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === "soonest" ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
    return <main className="section">
    <SectionTitle label="CAMPUS LIFE" title="Events Hub" text="Discover what is happening around campus."/>
    {error && <p className="error-message" role="alert">{error} <button className="outline" onClick={load}>Retry</button>
    </p>}
    <div className="toolbar">
        <input aria-label="Search events" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..."/>
            <select aria-label="Filter by category" value={category} onChange={e => setCategory(e.target.value)}>
                <option>All</option>
                <option>Technology</option>
                <option>Cultural</option>
                <option>Sports</option>
            </select>
            <select aria-label="Sort events" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="soonest">Date: soonest</option>
                <option value="latest">Date: latest</option>
            </select>
        </div>
        <div className="tabs" role="tablist" aria-label="Event categories">{["All", "Technology", "Cultural", "Sports"].map(item =>
            <button key={item} role="tab" aria-selected={category === item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
    {loading ? <p>Loading events…</p> : visible.length ? <div className="event-list">{visible.map(event =>
            <article className="card item-card" key={event.id}>
                <span className="pill">{event.category}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <small>📅 {event.date} · 📍 {event.location}</small>
                <div className="actions">
                    <button className="outline" onClick={() => setSelectedEvent(event)}>View details</button>
                    <button className="primary" onClick={() => register(event)}>{event.registered ? "Cancel registration" : "Register"}</button>
                </div>
            </article>)}</div> : <div className="card empty-state">No events match your search. Try another category or search term.</div>}
    {selectedEvent && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedEvent(null)}>
            <section className="modal card" role="dialog" aria-modal="true" aria-labelledby="event-modal-title" onClick={e => e.stopPropagation()}>
                <button className="modal-close" aria-label="Close details" onClick={() => setSelectedEvent(null)}>×</button>
                <span className="pill">{selectedEvent.category}</span>
                <h2 id="event-modal-title">{selectedEvent.title}</h2>
                <p>{selectedEvent.description}</p>
                <p>
                    <b>Date:</b> {selectedEvent.date}</p>
                <p>
                    <b>Location:</b> {selectedEvent.location}</p>
                <button className="primary" onClick={() => register(selectedEvent)}>{selectedEvent.registered ? "Cancel registration" : "Register for event"}</button>
            </section>
        </div>}
    </main>;
}
