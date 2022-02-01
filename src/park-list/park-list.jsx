import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import parksData from "../assets/parks.json";
import "./park-list.scss";
function ParkList() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const parks = parksData;
    const [currPage, setCurrPage] = useState(1);
    const cardPerPage = 12;
    const len = parks.length / cardPerPage;
    let totalPage;
    if (len % 1 === 0) {
        totalPage = len;
    } else {
        totalPage = Math.floor(len) + 1;
    }
    function loadPage(action) {
        // this.highlightIndex = [];
        // this.input.nativeElement.value = '';
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

    return (
        <>
            <div className="wrapper">
                <header className="header">
                    <div className="text-center title">台北市公園資料</div>
                </header>
                {loading === true && <div className="loader"></div>}
                <div className="container">
                    <input
                        type="text"
                        className="input-search"
                        placeholder="Search"
                    />
                    <div className="card-columns">
                        {parks
                            .slice((currPage - 1) * 12, currPage * 12)
                            .map((r, index) => (
                                <div
                                    className="card no-highlight"
                                    key={r.id}
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

                <footer className="text-center">
                    <span
                        className={currPage !== 1 ? "start-page" : ""}
                        onClick={() => loadPage("start")}
                    >
                        {"|<"}
                    </span>

                    <span className="tab"></span>

                    <span
                        className={currPage !== 1 ? "prev-page" : ""}
                        onClick={() => loadPage("prev")}
                    >
                        {"<"}
                    </span>

                    <span className="tab"></span>

                    {`${currPage}/${totalPage}`}

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
                        {">|"}
                    </span>
                </footer>
            </div>
        </>
    );
}

export default ParkList;
