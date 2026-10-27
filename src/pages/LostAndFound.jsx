import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { apiRequest } from "../utils/api";
import { useNotify } from "../context";
const emptyForm = { title: "", category: "Lost", location: "", date: "", description: "" };
export default function LostAndFound() {
    const notify = useNotify();
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    async function loadItems() {
        setLoading(true);
        setError("");
        try {
            setItems(await apiRequest("lostfound"));
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => { loadItems(); }, []);
    function updateField(e) { setForm({ ...form, [e.target.name]: e.target.value });
}
    async function saveItem(e) {
        e.preventDefault();
        if (!form.title.trim() || !form.location.trim() || !form.date) {
            setError("Please fill in the title, location and date.");
            return;
        }
        setError("");
        try {
            if (editingId)
                await apiRequest("lostfound", { method: "PATCH", id: editingId, body: form });
            else
                await apiRequest("lostfound", { method: "POST", body: form });
            setForm(emptyForm);
            setEditingId(null);
            notify(editingId ? "Item updated." : "Item added.");
            await loadItems();
        }
        catch (e) {
            setError(e.message);
        }
    }
    async function deleteItem(id) {
        if (!confirm("Delete this item?"))
            return;
        try {
            await apiRequest("lostfound", { method: "DELETE", id });
            notify("Item deleted.");
            await loadItems();
        }
        catch (e) {
            setError(e.message);
        }
    }
    function editItem(item) { setEditingId(item.id);
setForm({ title: item.title, category: item.category, location: item.location, date: item.date, description: item.description || "" });
}
    const visible = items.filter(item => (filter === "All" || item.category === filter) &&
        `${item.title} ${item.location} ${item.description}`.toLowerCase().includes(search.toLowerCase()));
    return <main className="section">
    <SectionTitle label="CAMPUS COMMUNITY" title="Lost & Found" text="Report lost belongings and help return found items."/>
    {error && <p className="error-message" role="alert">{error}</p>}
    <form onSubmit={saveItem} className="card form-card">
        <h2>{editingId ? "Edit item" : "Report an item"}</h2>
        <div className="form-grid">
            <label>Item name *<input name="title" value={form.title} onChange={updateField} required placeholder="e.g. Blue water bottle"/>
            </label>
            <label>Type<select name="category" value={form.category} onChange={updateField}>
                    <option>Lost</option>
                    <option>Found</option>
                </select>
            </label>
            <label>Location *<input name="location" value={form.location} onChange={updateField} required placeholder="Where was it lost/found?"/>
            </label>
            <label>Date *<input type="date" name="date" value={form.date} onChange={updateField} required/>
            </label>
        </div>
        <label>Description<textarea name="description" value={form.description} onChange={updateField} placeholder="Any helpful details"/>
        </label>
        <button className="primary" type="submit">{editingId ? "Save changes" : "Add item"}</button>{" "}
      {editingId && <button className="outline" type="button" onClick={() => { setEditingId(null);
setForm(emptyForm);
}}>Cancel</button>}
    </form>
    <div className="toolbar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search items or locations..."/>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option>All</option>
                <option>Lost</option>
                <option>Found</option>
            </select>
        </div>
    {loading ? <p>Loading items…</p> : visible.length ? <div className="simple-grid">{visible.map(item =>
            <article className="card item-card" key={item.id}>
                <span className="pill">{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.description || "No description provided."}</p>
                <small>📍 {item.location} · {item.date}</small>
                <div className="actions">
                    <button className="outline" onClick={() => editItem(item)}>Edit</button>
                    <button className="outline" onClick={() => deleteItem(item.id)}>Delete</button>
                </div>
            </article>)}</div> : <div className="card empty-state">No matching items yet. Add a report above.</div>}
    </main>;
}
