import { createContext, useContext, useEffect, useState } from "react";
import { apiRequest } from "./utils/api";
// Shared application state: profile and theme are used by multiple pages.
const AppContext = createContext(null);
export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState("");
    const [dark, setDark] = useState(false);
    const [profile, setProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);
    const [profileError, setProfileError] = useState("");
    // Load shared student details once when the app starts; failures stay visible.
    async function reloadProfile() {
        setProfileLoading(true);
        setProfileError("");
        try {
            setProfile(await apiRequest("profile"));
        }
        catch (error) {
            setProfileError(error.message);
        }
        finally {
            setProfileLoading(false);
        }
    }
    useEffect(() => { reloadProfile(); }, []);
    function notify(message) {
        setNotification(message);
        window.setTimeout(() => setNotification(""), 2500);
    }
    return <AppContext.Provider value={{ notification, notify, dark, setDark, profile, setProfile, profileLoading, profileError, reloadProfile }}>
    {children}
    {notification && <button className="toast" role="status" onClick={() => setNotification("")} aria-label="Dismiss notification">{notification} ×</button>}
</AppContext.Provider>;
}
export function useApp() {
    return useContext(AppContext);
}
export function useNotify() {
    return useApp().notify;
}
