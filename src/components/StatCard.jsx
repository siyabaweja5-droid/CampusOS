export default function StatCard({ icon, title, value, note, color }) { return <div className="stat">
    <span className={"stat-icon " + color}>{icon}</span>
    <div>
        <small>{title}</small>
        <strong>{value}</strong>
        <em>{note}</em>
    </div>
</div>;
}
