import { useState } from "react";
const places = [
    { id: "library", label: "📚 Library", detail: "Central Library · Study spaces and book lending" },
    { id: "centre", label: "☕ Student Centre", detail: "Student Centre · Cafeteria and student services" },
    { id: "academic", label: "🏫 Academic Block", detail: "Academic Block · Classrooms and laboratories" },
    { id: "auditorium", label: "🎭 Auditorium", detail: "Auditorium · Events and campus performances" },
];
export default function CampusMap() {
    const [selected, setSelected] = useState("");
    const place = places.find(item => item.id === selected);
    return <div className="map">
    <div className="road r1"/>
    <div className="road r2"/>
    <div className="road r3"/>
    {places.map((item, index) =>
    <button key={item.id} className={`pin p${index + 1}`} aria-pressed={selected === item.id} onClick={() => setSelected(selected === item.id ? "" : item.id)}>{item.label}</button>)}
    {place && <div className="map-place-info" role="status">
        <b>{place.label}</b>
        <span>{place.detail}</span>
    </div>}
    <span className="map-caption">CAMPUSOS • SELECT A PIN TO EXPLORE</span>
</div>;
}
