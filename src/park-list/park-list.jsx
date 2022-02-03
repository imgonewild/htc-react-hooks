/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import parksData from "../assets/parks.json";
import { useDebouncedEffect } from "../useDebouncedEffect";
import "./park-list.scss";

function ParkList() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currPage, setCurrPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [isGlobalAction, setIsGlobalAction] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState([]);
    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [searchMethod, setSearchMethod] = useState("local");
    const [parks, setParks] = useState(parksData);
    const cardPerPage = 12;
    const len = parksData.length / cardPerPage;

    useDebouncedEffect(() => searchOnchange(), [search], 250);

    useEffect(() => {
        setLoading(false);
        const search_key = localStorage.getItem("search_key");
        const search_method = localStorage.getItem("search_method");
        const currentPage = localStorage.getItem("current_page");

        if (search_key !== null) setSearch(search_key);
        if (search_method !== null) setSearchMethod(search_method);
        if (currentPage !== null) setCurrPage(currentPage);

        if (search_method === "global" && currentPage !== 1)
            setIsGlobalAction(true);

        setDefaultTotalPage(len);
    }, []);

    useEffect(() => {
        searchOnchange();
    }, [searchMethod, currPage]);

    function loadPage(action) {
        if (action === "next" && currPage !== totalPage) {
            setCurrPage((next) => parseInt(next) + 1);
        } else if (action === "end" && currPage !== totalPage) {
            setCurrPage(totalPage);
        } else if (action === "prev" && currPage !== 1) {
            setCurrPage((prev) => parseInt(prev) - 1);
        } else if (action === "start" && currPage !== 1) {
            setCurrPage(1);
        } else {
            return;
        }
        setHighlightIndex([]);
        setIsGlobalAction(true);
    }

    function searchOnchange() {
        setHighlightIndex([]);
        if (search === "" || search.length === 1) {
            localStorage.removeItem("search_key");
            localStorage.removeItem("current_page");
            setParks(() => parksData);
            setIsSearch(false);
            setDefaultTotalPage(len);
            return;
        }

        if (searchMethod === "local") {
            setIsSearch(true);
            setIsGlobalAction(false);
            parksData
                .slice((currPage - 1) * 12, currPage * 12)
                .filter((obj, i) => {
                    if (
                        obj["pm_name"].includes(search) ||
                        obj["pm_construction"].includes(search)
                    ) {
                        setHighlightIndex((highlightIndex) => [
                            ...highlightIndex,
                            i,
                        ]);
                        return obj;
                    }
                });
            setDefaultTotalPage(len);
        } else if (searchMethod === "global") {
            setIsSearch(true);
            if (currPage !== 1 && isGlobalAction === false) setCurrPage(1);
            const globalData = parksData.filter((obj, i) => {
                if (
                    obj["pm_name"].includes(search) ||
                    obj["pm_construction"].includes(search)
                ) {
                    setHighlightIndex((highlightIndex) => [
                        ...highlightIndex,
                        i,
                    ]);
                    return obj;
                }
                return false;
            });
            setParks(() => globalData);

            const len = globalData.length / cardPerPage;
            setDefaultTotalPage(len);
        }
    }

    function setDefaultTotalPage(len) {
        if (len % 1 === 0) {
            setTotalPage(len);
        } else {
            setTotalPage(Math.floor(len) + 1);
        }
    }

    function cardClick(method, index) {
        localStorage.setItem("current_page", currPage);
        localStorage.setItem("search_key", search);
        localStorage.setItem("search_method", searchMethod);
        if (method === "local")
            navigate(`/park-view/${(currPage - 1) * 12 + index}`);
        else if (method === "global")
            navigate(
                `/park-view/${highlightIndex[(currPage - 1) * 12 + index]}`
            );
    }

    return (
        <>
            <div className="park-list-wrapper">
                {loading === true && <div className="loader"></div>}

                <div className="container">
                    <header className="header">
                        <span className="tab"></span>
                        <span className="title">台北市公園資料</span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={
                                    searchMethod === "global" ? true : false
                                }
                                onChange={() => {
                                    setSearchMethod(() =>
                                        searchMethod === "local"
                                            ? "global"
                                            : "local"
                                    );
                                }}
                            />
                            <div
                                className="slider round"
                                title="search method"
                            ></div>
                        </label>
                    </header>
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
                        {searchMethod === "local" &&
                            parksData
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
                                            cardClick("local", index)
                                        }
                                    >
                                        <div className="header">
                                            <div className="title">
                                                {r.pm_name}
                                            </div>
                                            <div className="remark text-center">
                                                {r.pm_construction}
                                            </div>
                                        </div>

                                        <div className="desc">
                                            {r.pm_overview}
                                        </div>
                                    </div>
                                ))}
                        {searchMethod === "global" &&
                            parks
                                .slice((currPage - 1) * 12, currPage * 12)
                                .map((r, index) => (
                                    <div
                                        className={
                                            isSearch === true
                                                ? "card highlight"
                                                : "card no-highlight"
                                        }
                                        key={index}
                                        onClick={() =>
                                            cardClick("global", index)
                                        }
                                    >
                                        <div className="header">
                                            <div className="title">
                                                {r.pm_name}
                                            </div>
                                            <div className="remark text-center">
                                                {r.pm_construction}
                                            </div>
                                        </div>

                                        <div className="desc">
                                            {r.pm_overview}
                                        </div>
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
