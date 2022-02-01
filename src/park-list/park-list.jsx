import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import parksData from "../assets/parks.json";
import { useDebouncedEffect } from "../useDebouncedEffect";
import "./park-list.scss";

function ParkList() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [currPage, setCurrPage] = useState(1);
    const [highlightIndex, setHighlightIndex] = useState([]);
    const [search, setSearch] = useState("");
    useDebouncedEffect(() => searchOnchange(), [search], 500);
    useEffect(() => {
        setLoading(false);
    }, []);

    let totalPage;
    let parks = parksData;
    const cardPerPage = 12;
    const len = parks.length / cardPerPage;

    if (len % 1 === 0) {
        totalPage = len;
    } else {
        totalPage = Math.floor(len) + 1;
    }

    function loadPage(action) {
        setHighlightIndex([]);
        setSearch("");
        if (action === "next" && currPage !== totalPage) {
            setCurrPage((prev) => prev + 1);
        } else if (action === "prev" && currPage !== 1) {
            setCurrPage((prev) => prev - 1);
        } else if (action === "start") {
            setCurrPage(1);
        } else if (action === "end") {
            setCurrPage(totalPage);
        }
    }

    function cardClick(index) {
        navigate("/park-view/" + index);
    }

    function searchOnchange() {
        setHighlightIndex([]);
        if (search === "") return;
        const subParks = parks.slice((currPage - 1) * 12, currPage * 12);
        subParks.filter((obj, i) => {
            if (
                obj["pm_name"].includes(search) ||
                obj["pm_construction"].includes(search) ||
                obj["pm_overview"].includes(search)
            ) {
                setHighlightIndex((highlightIndex) => [...highlightIndex, i]);
                i++;
                return obj;
            }
            i++;
        });
        // console.log(search, highlightIndex, highlightIndex.includes(0));
    }

    return (
        <>
            <div className="park-list-wrapper">
                <header className="header">
                    <div className="text-center title">台北市公園資料</div>
                </header>

                {loading === true && <div className="loader"></div>}

                <div className="container">
                    <input
                        type="text"
                        className="input-search"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                    <div className="card-columns">
                        {parks
                            .slice((currPage - 1) * 12, currPage * 12)
                            .map((r, index) => (
                                <div
                                    className={
                                        highlightIndex.includes(index)
                                            ? "card highlight"
                                            : "card no-highlight"
                                    }
                                    key={index}
                                    onClick={() =>
                                        cardClick((currPage - 1) * 12 + index)
                                    }
                                >
                                    <div className="header">
                                        <div className="title">{r.pm_name}</div>
                                        <div className="remark text-center">
                                            {r.pm_construction}
                                        </div>
                                    </div>

                                    <div className="desc">{r.pm_overview}</div>
                                </div>
                            ))}
                    </div>
                </div>

                <footer className="footer text-center">
                    <span
                        className={currPage !== 1 ? "start-page" : ""}
                        onClick={() => loadPage("start")}
                    >
                        {"|< "}
                    </span>

                    <span className="tab"></span>

                    <span
                        className={currPage !== 1 ? "prev-page" : ""}
                        onClick={() => loadPage("prev")}
                    >
                        {"<"}
                    </span>

                    <span className="tab"></span>

                    {` ${currPage}/${totalPage} `}

                    <span className="tab"></span>

                    <span
                        className={currPage !== totalPage ? "next-page" : ""}
                        onClick={() => loadPage("next")}
                    >
                        {">"}
                    </span>

                    <span className="tab"></span>

                    <span
                        className={currPage !== totalPage ? "end-page" : ""}
                        onClick={() => loadPage("end")}
                    >
                        {" >|"}
                    </span>
                </footer>
            </div>
        </>
    );
}

export default ParkList;
