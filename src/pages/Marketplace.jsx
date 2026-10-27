import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { apiRequest } from "../utils/api";
import FormField from "../components/FormField";
import { useNotify } from "../context";
const blank = { title: "", category: "Books", price: "", seller: "", description: "" };
export default function Marketplace() {
    const notify = useNotify();
    const [items, setItems] = useState([]), [form, setForm] = useState(blank), [editing, setEditing] = useState(null), [search, setSearch] = useState(""), [categoryFilter, setCategoryFilter] = useState("All"), [sort, setSort] = useState("low"), [error, setError] = useState(""), [loading, setLoading] = useState(true);
    async function load() { setLoading(true);
setError("");
try {
        setItems(await apiRequest("marketplace"));
    }
    catch (e) {
        setError(e.message);
    }
    finally {
        setLoading(false);
    } }
    useEffect(() => { load(); }, []);
    function change(e) { setForm({ ...form, [e.target.name]: e.target.value });
}
    async function save(e) { e.preventDefault();
if (!form.title.trim() || form.price === "" || Number(form.price) < 0 || !form.seller.trim()) {
        setError("Enter a product name, valid price and seller name.");
        return;
    } setError("");
const body = { ...form, price: Number(form.price) };
try {
        if (editing)
            await apiRequest("marketplace", { method: "PATCH", id: editing, body });
        else
            await apiRequest("marketplace", { method: "POST", body });
        setForm(blank);
        setEditing(null);
        notify(editing ? "Listing updated." : "Listing added.");
        await load();
    }
    catch (e) {
        setError(e.message);
    } }
    async function remove(id) { if (!confirm("Delete this listing?"))
        return;
try {
        await apiRequest("marketplace", { method: "DELETE", id });
        notify("Listing deleted.");
        await load();
    }
    catch (e) {
        setError(e.message);
    } }
    const visible = items.filter(x => (categoryFilter === "All" || x.category === categoryFilter) && `${x.title} ${x.category} ${x.seller}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => sort === "low" ? a.price - b.price : b.price - a.price);
    return <main className="section">
    <SectionTitle label="STUDENT EXCHANGE" title="Marketplace" text="Buy and sell useful items with your campus community."/>
 {error && <p className="error-message" role="alert">{error}</p>}
    <form className="card form-card" onSubmit={save}>
        <h2>{editing ? "Edit listing" : "Create a listing"}</h2>
        <div className="form-grid">
            <FormField label="Product name *" name="title" value={form.title} onChange={change} required placeholder="e.g. Used textbook"/>
            <FormField label="Category" name="category" value={form.category} onChange={change} options={["Books", "Electronics", "Notes", "Other"]}/>
            <FormField label="Price (₹) *" name="price" type="number" min="0" value={form.price} onChange={change} required/>
            <FormField label="Seller *" name="seller" value={form.seller} onChange={change} required/>
        </div>
        <label>Description<textarea name="description" value={form.description} onChange={change} placeholder="Condition, details..."/>
        </label>
        <button className="primary" type="submit">{editing ? "Save changes" : "Add listing"}</button>{" "}{editing && <button className="outline" type="button" onClick={() => { setEditing(null);
setForm(blank);
}}>Cancel</button>}</form>
    <div className="toolbar">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search marketplace..."/>
            <select aria-label="Filter product category" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                <option>All</option>
                <option>Books</option>
                <option>Electronics</option>
                <option>Notes</option>
                <option>Other</option>
            </select>
            <select aria-label="Sort by price" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
            </select>
        </div>
 {loading ? <p>Loading listings…</p> : visible.length ? <div className="simple-grid">{visible.map(item =>
            <article className="card item-card" key={item.id}>
                <span className="pill">{item.category}</span>
                <h3>{item.title}</h3>
                <strong className="price">₹{item.price}</strong>
                <p>{item.description || "No description provided."}</p>
                <small>Seller: {item.seller}</small>
                <div className="actions">
                    <button className="outline" onClick={() => { setEditing(item.id); setForm({ ...item, price: String(item.price) }); }}>Edit</button>
                    <button className="outline" onClick={() => remove(item.id)}>Delete</button>
                </div>
            </article>)}</div> : <div className="card empty-state">No listings match your search.</div>}</main>;
}
