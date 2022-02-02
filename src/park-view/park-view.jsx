import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parksData from "../assets/parks.json";
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./park-view.scss";
Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

function ParkView() {
    const navigate = useNavigate();
    const parks = parksData;
    const { index } = useParams();
    const [loading, setLoading] = useState(true);
    const data = parks[index];
    const position = [data.pm_lat, data.pm_lon];
    let parkName = data.pm_name;
    let desc = data.pm_overview;
    let location = data.pm_location;
    let transit = data.pm_transit;

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <div className="park-view-wrapper">
                <header className="header">
                    <span className="back" onClick={() => navigate("/")}>
                        {"<Back"}
                    </span>
                    <span>{parkName}</span>
                    <span className="tab"></span>
                </header>

                {loading === true && <div className="loader"></div>}

                <div className={loading === false ? "content" : "hidden"}>
                    <div className="desc">{desc}</div>
                    <MapContainer
                        style={{ height: "356px" }}
                        center={position}
                        zoom={13}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>{parkName}</Popup>
                        </Marker>
                    </MapContainer>
                    <div className="location">{location}</div>
                    <div className="transit">{transit}</div>
                </div>
            </div>
        </>
    );
}

export default ParkView;
