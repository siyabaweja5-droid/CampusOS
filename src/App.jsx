import { Routes, Route } from "react-router-dom";
import { useApp } from "./context";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import Library from "./pages/Library";
import CampusMapPage from "./pages/CampusMapPage";
import Placements from "./pages/Placements";
import SkillExchange from "./pages/SkillExchange";
import LostAndFound from "./pages/LostAndFound";
import Marketplace from "./pages/Marketplace";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Attendance from "./pages/Attendance";
import Timetable from "./pages/Timetable";
import CampusAssistant from "./pages/CampusAssistant";
import AcademicHub from "./pages/AcademicHub";
export default function App() {
    const { dark, setDark } = useApp();
    return <div className={dark ? "app dark" : "app"}>
    <Sidebar />
    <div className="content">
        <Header />
        <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/events" element={<Events />}/>
            <Route path="/attendance" element={<Attendance />}/>
            <Route path="/academics" element={<AcademicHub />}/>
            <Route path="/timetable" element={<Timetable />}/>
            <Route path="/assistant" element={<CampusAssistant />}/>
            <Route path="/library" element={<Library />}/>
            <Route path="/map" element={<CampusMapPage />}/>
            <Route path="/placements" element={<Placements />}/>
            <Route path="/skills" element={<SkillExchange />}/>
            <Route path="/lost-found" element={<LostAndFound />}/>
            <Route path="/marketplace" element={<Marketplace />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/settings" element={<Settings />}/>
        </Routes>
    </div>
</div>;
}
