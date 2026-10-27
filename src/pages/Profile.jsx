import { useState, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import { apiRequest } from "../utils/api";
import { useApp } from "../context";
export default function Profile() {
    const { profile, setProfile, profileLoading, profileError, reloadProfile, notify } = useApp();
    const [draft, setDraft] = useState(null);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    // Keep the editable form local; update shared profile only after Save succeeds.
    useEffect(() => { if (!profileLoading && profile && !draft)
        setDraft({ ...profile }); }, [profileLoading, profile, draft]);
    function change(event) {
        const { name, value, type, checked } = event.target;
        setDraft({ ...draft, [name]: type === "checkbox" ? checked : value });
    }
    async function save(event) {
        event.preventDefault();
        if (!draft.name.trim() || !/^\S+@\S+\.\S+$/.test(draft.email)) {
            setError("Enter your name and a valid email address.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            const saved = await apiRequest("profile", { method: "PATCH", body: draft });
            setProfile(saved);
            setDraft({ ...saved });
            notify("Profile saved successfully.");
        }
        catch (e) {
            setError(e.message);
        }
        finally {
            setSaving(false);
        }
    }
    if (profileLoading)
        return <main className="section">
    <p>Loading profile…</p>
</main>;
    if (profileError || !profile || !draft)
        return <main className="section">
    <SectionTitle label="ACCOUNT" title="Profile & Settings" text="Manage your student details and preferences."/>
    <p className="error-message" role="alert">{profileError || "Profile data is not available."}</p>
    <button className="primary" onClick={reloadProfile}>Retry profile request</button>
</main>;
    return <main className="section">
    <SectionTitle label="ACCOUNT" title="Profile & Settings" text="Manage your student details and preferences."/>
    {error && <p className="error-message" role="alert">{error}</p>}
    <form className="card form-card profile-form" onSubmit={save}>
        <div className="profile">
            <span className="big-avatar">{(draft.name || "S").charAt(0).toUpperCase()}</span>
            <label>STUDENT PROFILE</label>
            <h1>{draft.name}</h1>
            <p>{draft.department}</p>
        </div>
        <div className="form-grid">
            <label>Full name *<input name="name" value={draft.name} onChange={change} required maxLength="70"/>
            </label>
            <label>Email *<input type="email" name="email" value={draft.email} onChange={change} required/>
            </label>
            <label>Department<input name="department" value={draft.department} onChange={change} maxLength="100"/>
            </label>
            <label>Semester<input name="semester" value={draft.semester} onChange={change} maxLength="30"/>
            </label>
        </div>
        <label className="check-row">
            <input type="checkbox" name="notifications" checked={Boolean(draft.notifications)} onChange={change}/> Enable notifications</label>
        <button className="primary" type="submit" disabled={saving}>{saving ? "Saving…" : "Save profile"}</button>
    </form>
</main>;
}
