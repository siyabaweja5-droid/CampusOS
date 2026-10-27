import { useEffect, useState } from "react";
import { Clock3, FileText, Award, CalendarDays, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { useApp } from "../context";
import StatCard from "../components/StatCard";
import ClassCard from "../components/ClassCard";
import EventCard from "../components/EventCard";
import AnnouncementCard from "../components/AnnouncementCard";
import BookCard from "../components/BookCard";
import CampusMap from "../components/CampusMap";
export default function Dashboard() {
    const nav = useNavigate();
    const { profile, notify } = useApp();
    const [events, setEvents] = useState([]);
    const [books, setBooks] = useState([]);
    const [lostItems, setLostItems] = useState([]);
    const [marketItems, setMarketItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // Fetch dashboard summaries from the same REST API used by the detail pages.
    useEffect(() => {
        Promise.all([apiRequest("events"), apiRequest("library"), apiRequest("lostfound"), apiRequest("marketplace")])
            .then(([eventData, bookData, lostData, marketData]) => {
            setEvents(eventData);
            setBooks(bookData);
            setLostItems(lostData);
            setMarketItems(marketData);
        })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);
    async function register(event) {
        try {
            await apiRequest("events", { method: "PATCH", id: event.id, body: { registered: !event.registered } });
            setEvents(current => current.map(item => item.id === event.id ? { ...item, registered: !item.registered } : item));
            notify(event.registered ? "Registration cancelled." : `Registered for ${event.title}.`);
        }
        catch (e) {
            setError(e.message);
        }
    }
    const upcomingEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 2);
    return <main className="section">
    <div className="hero">
        <div>
            <label>CAMPUS OVERVIEW</label>
            <h1>Good evening, {profile?.name || "Student"} <span>✦</span>
            </h1>
            <p>Your campus, academics and opportunities — all in one place.</p>
        </div>
        <button className="primary" onClick={() => nav("/map")}>Explore Campus <ArrowUpRight size={14}/>
        </button>
    </div>
    {error && <p className="error-message" role="alert">{error} <button className="outline" onClick={() => window.location.reload()}>Retry</button>
    </p>}
    <div className="stats">
        <StatCard icon={<Clock3 />} title="Attendance" value="92.4%" note="↑ 2.4% this month" color="purple"/>
        <StatCard icon={<FileText />} title="Assignments" value="08" note="3 due this week" color="blue"/>
        <StatCard icon={<Award />} title="Credits Earned" value="74" note="6 remaining this sem" color="green"/>
        <StatCard icon={<CalendarDays />} title="Events" value={loading ? "…" : String(events.length).padStart(2, "0")} note={`${events.filter(event => event.registered).length} registered`} color="orange"/>
    </div>
    <div className="two">
        <div className="card">
            <div className="card-head">
                <div>
                    <label>TODAY</label>
                    <h2>Upcoming Classes</h2>
                </div>
            </div>
            <ClassCard time="09:00" name="Object Oriented Programming" info="Room A-204 • Dr. Sharma" color="purple" now/>
            <ClassCard time="11:00" name="Statistics & Probability" info="Room B-102 • Prof. Mehta" color="blue"/>
            <ClassCard time="02:00" name="Front End Engineering" info="Lab C-301 • Ms. Kaur" color="green"/>
        </div>
        <div className="card">
            <div className="card-head">
                <div>
                    <label>NOTICE BOARD</label>
                    <h2>Latest Announcements</h2>
                </div>
            </div>
            <AnnouncementCard icon="📢" title="Mid-Semester Examinations" text="Schedule has been published. Check your exam portal." time="2 hours ago"/>
            <AnnouncementCard icon="🎓" title="Placement Drive — Microsoft" text="Registration closes September 5." time="Yesterday"/>
            <AnnouncementCard icon="📚" title="Library Timings Updated" text="Central Library open until 10 PM." time="2 days ago"/>
        </div>
    </div>
    <div className="two">
        <div className="card">
            <div className="card-head">
                <div>
                    <label>CAMPUS LIFE</label>
                    <h2>Featured Events</h2>
                </div>
                <button className="link" onClick={() => nav("/events")}>All events →</button>
            </div>
      {loading ? <p>Loading events…</p> : upcomingEvents.length ? <div className="events">{upcomingEvents.map(event =>
                <EventCard key={event.id} title={event.title} type={(event.category || "CAMPUS").toUpperCase()} date={event.date} theme={event.category === "Technology" ? "tech" : event.category === "Sports" ? "sports" : "culture"} onClick={() => register(event)} actionLabel={event.registered ? "Cancel registration" : "Register"}/>)}</div> : <p>No upcoming events available.</p>}
            </div>
            <div className="card">
                <div className="card-head">
                    <div>
                        <label>SMART LIBRARY</label>
                        <h2>Quick Search</h2>
                    </div>
                    <button className="link" onClick={() => nav("/library")}>Library →</button>
                </div>
      {loading ? <p>Loading books…</p> : books.slice(0, 3).map(book =>
                <BookCard key={book.id} code={book.title.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase()} title={book.title} author={book.author} status={book.status}/>)}
                </div>
            </div>
            <div className="two">
                <div className="card">
                    <div className="card-head">
                        <div>
                            <label>CAMPUS COMMUNITY</label>
                            <h2>Recent Lost & Found</h2>
                        </div>
                        <button className="link" onClick={() => nav("/lost-found")}>View all →</button>
                    </div>{loading ? <p>Loading items…</p> : lostItems.slice(0, 3).map(item =>
                    <div className="notice" key={item.id}>
                        <span>🔎</span>
                        <div>
                            <b>{item.title}</b>
                            <p>{item.category} · {item.location}</p>
                            <small>{item.date}</small>
                        </div>
                    </div>)}{!loading && !lostItems.length && <p>No lost or found reports yet.</p>}</div>
                <div className="card">
                    <div className="card-head">
                        <div>
                            <label>STUDENT EXCHANGE</label>
                            <h2>Marketplace highlights</h2>
                        </div>
                        <button className="link" onClick={() => nav("/marketplace")}>Marketplace →</button>
                    </div>{loading ? <p>Loading listings…</p> : marketItems.slice(0, 3).map(item =>
                    <div className="notice" key={item.id}>
                        <span>🛍️</span>
                        <div>
                            <b>{item.title}</b>
                            <p>₹{item.price} · {item.seller}</p>
                            <small>{item.category}</small>
                        </div>
                    </div>)}{!loading && !marketItems.length && <p>No listings yet.</p>}</div>
            </div>
            <div className="card map-card">
                <div className="card-head">
                    <div>
                        <label>DISCOVER</label>
                        <h2>Interactive Campus Map</h2>
                    </div>
                    <button className="outline" onClick={() => nav("/map")}>Open full map ↗</button>
                </div>
                <CampusMap />
            </div>
        </main>;
}
