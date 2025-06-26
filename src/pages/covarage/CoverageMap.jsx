// src/components/CoverageMap.jsx
import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Your 64 district data
import districts from "../../assets/warehouses.json"; // <-- Save your district JSON in this file

// Helper Component to move map on search
const FlyToDistrict = ({ coords }) => {
    const map = useMap();
    if (coords) map.flyTo(coords, 10); // Zoom level 10
    return null;
};

const CoverageMap = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [flyCoords, setFlyCoords] = useState(null);
    const [matchedDistrict, setMatchedDistrict] = useState(null);

    // Search handler
    const handleSearch = () => {
        const result = districts.find((d) =>
            d.district.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (result) {
            setFlyCoords([result.latitude, result.longitude]);
            setMatchedDistrict(result.district);
        } else {
            alert("District not found!");
        }
    };

    return (
        <div className="space-y-4">
            {/* Search Box */}
            <div className="w-full flex justify-center gap-2">
                <input
                    type="text"
                    placeholder="Search district..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <button onClick={handleSearch} className="btn btn-primary">
                    Search
                </button>
            </div>

            {/* Map */}
            <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
                <MapContainer
                    center={[23.685, 90.3563]}
                    zoom={7}
                    scrollWheelZoom={true}
                    className="w-full h-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Markers for all districts */}
                    {districts.map((d, idx) => (
                        <Marker
                            key={idx}
                            position={[d.latitude, d.longitude]}
                            icon={customIcon}
                        >
                            <Popup>
                                <strong>{d.district}</strong>
                                <br />
                                Covered Areas: {d.covered_area.join(", ")}
                            </Popup>
                        </Marker>
                    ))}

                    {/* Trigger flyTo */}
                    {flyCoords && <FlyToDistrict coords={flyCoords} />}
                </MapContainer>
            </div>
        </div>
    );
};

export default CoverageMap;
