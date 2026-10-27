// Reusable controlled field for forms across the app.
export default function FormField({ label, name, value, onChange, type = "text", required = false, placeholder = "", min, options }) {
    return <label>{label}{options ? <select name={name} value={value} onChange={onChange} required={required}>{options.map(option =>
        <option key={option} value={option}>{option}</option>)}</select> : <input name={name} type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} min={min}/>}</label>;
}
