import { Moon, Sun, Bell, Search } from "lucide-react";
import { useApp } from "../context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function Header() {
    const { dark, setDark, notify, profile } = useApp();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    function submitSearch(event) {
        event.preventDefault();
        const value = query.trim().toLowerCase();
        if (!value)
            return;
        const destinations = [
            ["academic", "/academics"], ["cgpa", "/academics"], ["gpa", "/academics"], ["exam", "/academics"], ["attendance", "/attendance"], ["timetable", "/timetable"], ["assistant", "/assistant"], ["event", "/events"], ["lost", "/lost-found"], ["found", "/lost-found"],
            ["market", "/marketplace"], ["sell", "/marketplace"], ["book", "/library"],
            ["library", "/library"], ["profile", "/profile"], ["setting", "/settings"]
        ];
        const match = destinations.find(([word]) => value.includes(word));
        if (match) {
            navigate(match[1]);
            notify(`Opened ${match[1] === "/lost-found" ? "Lost & Found" : match[1].slice(1)}.`);
        }
        else
            notify(`Search for “${query}” in the page filters below.`);
    }
    return <header className="topbar">
    <form className="search" onSubmit={submitSearch} role="search">
        <Search size={15}/>
        <input aria-label="Quick campus search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try events, books, marketplace…"/>
            <button type="submit" className="header-search-button">Search</button>
        </form>
        <div className="actions">
            <button aria-label="Toggle dark mode" onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</button>
            <button aria-label="Notifications" onClick={() => notify(profile?.notifications === false ? "Notifications are turned off in Profile & Settings." : "You are all caught up!")}>
                <Bell />
                <i />
            </button>
            <span className="avatar">{(profile?.name || "S").charAt(0).toUpperCase()}</span>
        </div>
    </header>;
}
