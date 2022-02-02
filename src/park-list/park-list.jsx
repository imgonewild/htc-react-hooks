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
    const [highlightIndex, setHighlightIndex] = useState([]);
    const [search, setSearch] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [searchMethod, setSearchMethod] = useState("local");
    const [parks, setParks] = useState(parksData);
    const cardPerPage = 12;
    const len = parks.length / cardPerPage;

    useDebouncedEffect(() => searchOnchange(), [search], 250);

    useEffect(() => {
        setLoading(false);
        const search_key = localStorage.getItem("search_key");
        if (search_key !== null) setSearch(search_key);

        const search_method = localStorage.getItem("search_method");
        if (search_method !== null) setSearchMethod(search_method);

        const currentPage = localStorage.getItem("current_page");
        if (currentPage !== null) setCurrPage(currentPage);

        if (len % 1 === 0) {
            setTotalPage(len);
        } else {
            setTotalPage(Math.floor(len) + 1);
        }
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
    }

    function searchOnchange() {
        setHighlightIndex([]);
        if (search === "" || search.length === 1) {
            localStorage.removeItem("search_key");
            localStorage.removeItem("current_page");
            setParks(() => parksData);
            setIsSearch(false);
            return;
        }

        if (searchMethod === "local") {
            setIsSearch(true);
            const subParks = parksData.slice(
                (currPage - 1) * 12,
                currPage * 12
            );
            subParks.filter((obj, i) => {
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
        } else if (searchMethod === "global") {
            setIsSearch(true);
            setCurrPage(1);
            setParks(() =>
                parksData.filter((obj, i) => {
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
                })
            );
        }
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
                                    setSearchMethod(() => {
                                        if (searchMethod === "local")
                                            return "global";
                                        else if (searchMethod === "global")
                                            return "local";
                                    });
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
                                        onClick={() => {
                                            console.log(highlightIndex);
                                            localStorage.setItem(
                                                "current_page",
                                                currPage
                                            );
                                            localStorage.setItem(
                                                "search_key",
                                                search
                                            );
                                            localStorage.setItem(
                                                "search_method",
                                                searchMethod
                                            );
                                            navigate(
                                                `/park-view/${
                                                    (currPage - 1) * 12 + index
                                                }`
                                            );
                                        }}
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
                                        onClick={() => {
                                            localStorage.setItem(
                                                "current_page",
                                                currPage
                                            );
                                            localStorage.setItem(
                                                "search_key",
                                                search
                                            );
                                            localStorage.setItem(
                                                "search_method",
                                                searchMethod
                                            );
                                            navigate(
                                                `/park-view/${
                                                    highlightIndex[index] - 1
                                                }`
                                            );
                                        }}
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
