export default function EventCard({ title, type, date, theme, onClick, actionLabel }) {
    return <article className="event">
    <div className={`event-cover ${theme}`}>
        <small>{theme === "tech" ? "TECH" : theme === "culture" ? "CAMPUS" : "SPORTS"}</small>
        <b>{theme === "tech" ? "FEST '26" : theme === "culture" ? "NIGHTS" : "MEET '26"}</b>
    </div>
    <div className="event-body">
        <span className="pill">{type}</span>
        <h3>{title}</h3>
        <p>{date}</p>
        <button type="button" onClick={onClick}>{actionLabel || "View details →"}</button>
    </div>
</article>;
}
