import { useState } from "react";
import { Moon, Sun, Bell, UserRound, Info } from "lucide-react";
import { useApp } from "../context";
import { useNavigate } from "react-router-dom";
export default function Settings() {
    const { dark, setDark, profile, notify } = useApp();
    const [tab, setTab] = useState("preferences");
    const navigate = useNavigate();
    return <main className="section extra settings-page">
    <label>ACCOUNT</label>
    <h1>Settings</h1>
    <p>Manage CampusOS appearance and preferences.</p>
    <div className="tabs" role="tablist" aria-label="Settings sections">
        <button role="tab" aria-selected={tab === "preferences"} className={tab === "preferences" ? "active" : ""} onClick={() => setTab("preferences")}>Preferences</button>
        <button role="tab" aria-selected={tab === "account"} className={tab === "account" ? "active" : ""} onClick={() => setTab("account")}>Account</button>
        <button role="tab" aria-selected={tab === "about"} className={tab === "about" ? "active" : ""} onClick={() => setTab("about")}>About</button>
    </div>
    {tab === "preferences" && <div className="settings-panel">
        <button className="setting" onClick={() => { setDark(!dark);
notify(`Dark mode ${!dark ? "enabled" : "disabled"}.`);
}}>{dark ? <Sun /> : <Moon />}<span>
                <b>Appearance</b>
                <small>Switch between light and dark theme</small>
            </span>
            <strong>{dark ? "Dark" : "Light"}</strong>
        </button>
        <button className="setting" onClick={() => navigate("/profile")}>
            <Bell />
            <span>
                <b>Notifications</b>
                <small>Manage notification preference in your profile</small>
            </span>
            <strong>{profile?.notifications === false ? "Off" : "On"}</strong>
        </button>
    </div>}
    {tab === "account" && <div className="settings-panel">
        <button className="setting" onClick={() => navigate("/profile")}>
            <UserRound />
            <span>
                <b>{profile?.name || "Student"}</b>
                <small>{profile?.email || "Update your contact information"}</small>
            </span>
            <strong>Edit profile →</strong>
        </button>
    </div>}
    {tab === "about" && <div className="settings-panel card about-panel">
        <Info />
        <h2>CampusOS Student Portal</h2>
        <p>A React single-page application demonstrating routing, shared state, REST API integration, CRUD operations and responsive design.</p>
        <small>Frontend: React + Vite · API: JSON Server</small>
    </div>}
</main>;
}
