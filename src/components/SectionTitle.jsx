export default function SectionTitle({ label, title, text }) { return <div className="page-title">
    <label>{label}</label>
    <h1>{title}</h1>{text && <p>{text}</p>}</div>;
}
