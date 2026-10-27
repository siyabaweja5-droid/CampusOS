import CampusMap from "../components/CampusMap";
import SectionTitle from "../components/SectionTitle";
export default function CampusMapPage() { return <main className="section">
    <SectionTitle label="DISCOVER" title="Interactive Campus Map" text="Explore important places around your university campus."/>
    <div className="card">
        <CampusMap />
    </div>
</main>;
}
