export default function BookCard({ code, title, author, status, color = "" }) { return <div className="book">
    <span className={"cover " + color}>{code}</span>
    <div>
        <b>{title}</b>
        <small>{author}</small>
    </div>
    <strong className={status === "Issued" ? "issued" : ""}>{status}</strong>
</div>;
}
