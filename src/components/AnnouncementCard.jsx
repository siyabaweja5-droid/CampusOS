export default function AnnouncementCard({ icon, title, text, time }) { return <div className="notice">
    <span>{icon}</span>
    <div>
        <b>{title}</b>
        <p>{text}</p>
        <small>{time}</small>
    </div>
</div>;
}
