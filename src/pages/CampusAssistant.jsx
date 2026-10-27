import { useState } from "react";
import { Bot, Send, Sparkles, BookOpen, CalendarDays, MapPin, BriefcaseBusiness } from "lucide-react";
const suggestions = ["How can I improve attendance?", "What campus events are coming up?", "Where can I find study resources?", "How do I prepare for placements?"];
function answerFor(q) { const s = q.toLowerCase();
if (s.includes("attendance") || s.includes("absent"))
    return "Open Attendance Intelligence from the sidebar to check each subject. Try to keep every subject at or above 75%; the tracker estimates how many consecutive classes you may need to attend to reach your target.";
if (s.includes("event") || s.includes("hackathon"))
    return "Visit Events to browse campus activities, filter by category, open event details and register. The demo includes technology, cultural and sports events.";
if (s.includes("library") || s.includes("book") || s.includes("study"))
    return "Open Smart Library to search books and save favourites. You can also use the timetable to plan a study block around your classes.";
if (s.includes("placement") || s.includes("resume") || s.includes("job"))
    return "Visit Placements for the placement preparation dashboard. A good starting plan is: update your resume, practise DSA daily, build one portfolio project and do a mock interview each week.";
if (s.includes("map") || s.includes("where") || s.includes("room"))
    return "Use Campus Map for a quick campus layout. Your timetable also stores room details against each class so you can check the location before class.";
if (s.includes("lost") || s.includes("found"))
    return "Open Lost & Found to post a lost or found item. Include a clear title, location and date so other students can identify it.";
if (s.includes("market") || s.includes("sell") || s.includes("buy"))
    return "Open Marketplace to browse student listings or add an item for sale. Verify the item and agree on a safe campus pickup with the seller.";
return "I can help you navigate CampusOS. Try asking about attendance, events, library books, placements, campus map, Lost & Found or Marketplace. This is a built-in demo assistant, not a live AI service.";
}
export default function CampusAssistant() { const [messages, setMessages] = useState([{ role: "assistant", text: "Hi! I’m the CampusOS Guide. Ask me about campus services, attendance, events, library resources or placements." }]);
const [draft, setDraft] = useState("");
function send(text = draft) { const q = text.trim();
if (!q)
    return;
setMessages(old => [...old, { role: "user", text: q }, { role: "assistant", text: answerFor(q) }]);
setDraft("");
} return <section className="section">
    <div className="page-title">
        <label>STUDENT SUPPORT</label>
        <h1>Campus <span style={{ color: "#7051e5" }}>Assistant</span>
        </h1>
        <p>A built-in guide to help you discover campus features and student resources.</p>
    </div>
    <div className="assistant-layout">
        <div className="card assistant-chat">
            <div className="assistant-head">
                <div className="assistant-icon">
                    <Bot size={22}/>
                </div>
                <div>
                    <b>CampusOS Guide</b>
                    <small>
                        <span className="online-dot"/> Available · Demo assistant</small>
                </div>
                <span className="pill">QUICK HELP</span>
            </div>
            <div className="chat-messages">{messages.map((m, i) =>
                <div key={i} className={`chat-message ${m.role}`}>
                    <span>{m.role === "assistant" ? <Bot size={15}/> : "You"}</span>
                    <p>{m.text}</p>
                </div>)}</div>
            <form className="chat-input" onSubmit={e => { e.preventDefault();
send();
}}>
                <input value={draft} onChange={e => setDraft(e.target.value)} placeholder="Ask about attendance, events, library..."/>
                    <button className="primary" type="submit" aria-label="Send message">
                        <Send size={16}/>
                    </button>
                </form>
            </div>
            <div className="card assistant-side">
                <label>TRY ASKING</label>
                <h2>How can I help?</h2>{suggestions.map((s, i) =>
                <button key={s} className="suggestion" onClick={() => send(s)}>
                    <Sparkles size={15}/>
                    <span>{s}</span>
                </button>)}<div className="assistant-shortcuts">
                    <label>CAMPUS SHORTCUTS</label>
                    <a href="/attendance">
                        <CheckIcon />
                        <span>Attendance tracker</span>
                    </a>
                    <a href="/events">
                        <CalendarDays size={16}/>
                        <span>Upcoming events</span>
                    </a>
                    <a href="/map">
                        <MapPin size={16}/>
                        <span>Campus map</span>
                    </a>
                    <a href="/placements">
                        <BriefcaseBusiness size={16}/>
                        <span>Placement hub</span>
                    </a>
                    <a href="/library">
                        <BookOpen size={16}/>
                        <span>Smart library</span>
                    </a>
                </div>
            </div>
        </div>
        <p className="muted">Transparency: responses are generated from built-in rules. This demo does not connect to an external AI model or access private student records.</p>
    </section>;
}
function CheckIcon() { return <CalendarDays size={16}/>;
}
