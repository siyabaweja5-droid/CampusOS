import { useApp } from "../context";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, CalendarDays, BookOpen, Map, BriefcaseBusiness, Handshake, Search, ShoppingBag, UserRound, Settings, ClipboardCheck, CalendarClock, Bot, GraduationCap } from "lucide-react";
const links = [["/", "Dashboard", LayoutDashboard], ["/events", "Events", CalendarDays], ["/attendance", "Attendance", ClipboardCheck], ["/academics", "Academic Hub", GraduationCap], ["/timetable", "Timetable", CalendarClock], ["/assistant", "Campus Assistant", Bot], ["/library", "Smart Library", BookOpen], ["/map", "Campus Map", Map], ["/placements", "Placements", BriefcaseBusiness], ["/skills", "Skill Exchange", Handshake], ["/lost-found", "Lost & Found", Search], ["/marketplace", "Marketplace", ShoppingBag], ["/profile", "Profile", UserRound], ["/settings", "Settings", Settings]];
export default function Sidebar() { const { profile } = useApp();
return <aside className="sidebar">
    <div className="brand">
        <span>C</span>
        <div>
            <b>CampusOS</b>
            <small>SMART UNIVERSITY</small>
        </div>
    </div>
    <nav>
        <p>MAIN</p>{links.slice(0, 8).map(Link)}<p>STUDENT</p>{links.slice(8, 12).map(Link)}<p>ACCOUNT</p>{links.slice(12).map(Link)}</nav>
    <div className="side-bottom">
        <div className="future">
            <b>CampusOS Plus</b>
            <small>13 student productivity modules</small>
        </div>
        <div className="mini-user">
            <span>S</span>
            <div>
                <b>{profile?.name || "Student"}</b>
                <small>{profile?.department || "Campus member"}</small>
            </div>
        </div>
    </div>
</aside>;
}
function Link([to, label, Icon]) { return <NavLink to={to} end={to === "/"}>
    <Icon size={17}/>
    <span>{label}</span>
</NavLink>;
}
