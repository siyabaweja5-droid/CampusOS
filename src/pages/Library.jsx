import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import BookCard from "../components/BookCard";
import SectionTitle from "../components/SectionTitle";
import { apiRequest } from "../utils/api";
import { useFavorites } from "../store/favorites";
import { useNotify } from "../context";
export default function Library() {
    const [books, setBooks] = useState([]), [q, setQ] = useState(""), [filter, setFilter] = useState("All"), [error, setError] = useState(""), [loading, setLoading] = useState(true);
    const favorites = useFavorites(s => s.favorites);
    const toggleFavorite = useFavorites(s => s.toggleFavorite);
    const notify = useNotify();
    async function load() { setLoading(true);
setError("");
try {
        setBooks(await apiRequest("library"));
    }
    catch (e) {
        setError(e.message);
    }
    finally {
        setLoading(false);
    } }
    useEffect(() => { load(); }, []);
    const visible = books.filter(b => b.title.toLowerCase().includes(q.toLowerCase()) || b.author.toLowerCase().includes(q.toLowerCase())).filter(b => filter === "All" || (filter === "Available" && b.status === "Available") || (filter === "Favorites" && favorites.includes(String(b.id))));
    return <main className="section">
    <SectionTitle label="SMART LIBRARY" title="Library" text="Search books, authors and availability."/>
 {error && <p className="error-message" role="alert">{error}</p>}<div className="large-search">
        <Search size={17}/>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search books or authors..."/>
        </div>
        <div className="toolbar">
            <span>{visible.length} resources</span>
            <select value={filter} onChange={e => setFilter(e.target.value)}>
                <option>All</option>
                <option>Available</option>
                <option>Favorites</option>
            </select>
        </div>
 {loading ? <p>Loading library…</p> : visible.length ? <div className="library-grid">{visible.map(book =>
            <div className="library-card" key={book.id}>
                <BookCard code={book.title.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()} title={book.title} author={book.author} status={book.status}/>
                    <button className="primary small" onClick={() => { toggleFavorite(String(book.id)); notify(favorites.includes(String(book.id)) ? "Book removed from favorites." : "Book added to favorites."); }}>{favorites.includes(String(book.id)) ? "★ Saved" : "☆ Save favorite"}</button>
                </div>)}</div> : <div className="card empty-state">No books match this view.</div>}</main>;
}
