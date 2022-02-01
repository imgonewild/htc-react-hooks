import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parksData from "../assets/parks.json";
import "./park-view.scss";

function ParkView() {
    const navigate = useNavigate();
    const parks = parksData;
    const { index } = useParams();
    const [loading, setLoading] = useState(true);
    const data = parks[index];

    let parkName = data.pm_name;
    let desc = data.pm_overview;
    let location = data.pm_location;
    let transit = data.pm_transit;

    useEffect(() => {
        setLoading(false);
    }, []);

    function backClick() {
        navigate("/");
    }
    return (
        <>
            <div className="park-view-wrapper">
                <header className="header">
                    <span className="back" onClick={() => backClick()}>
                        &#60;Back
                    </span>
                    <span className="name">{parkName}</span>
                </header>

                {loading === true && <div className="loader"></div>}

                <div className={loading === false ? "contain" : "hidden"}>
                    <div className="desc">Description: {desc}</div>
                    <div className="map">MAP</div>
                    <div className="location">Location: {location}</div>
                    <div className="transit">Transit: {transit}</div>
                </div>
            </div>
        </>
    );
}

export default ParkView;
