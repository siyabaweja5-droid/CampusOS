export default function ClassCard({ time, name, info, color, now }) { return <div className="class-row">
    <time>{time}<small>AM</small>
    </time>
    <span className={"dot " + color}/>
    <div>
        <b>{name}</b>
        <small>{info}</small>
    </div>{now && <mark>NOW</mark>}</div>;
}
