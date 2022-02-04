/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebouncedEffect } from "../useDebouncedEffect";
import originParksData from "../assets/parks.json";
import "./park-list.scss";

function ParkList() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [currPage, setCurrPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [highlightIndex, setHighlightIndex] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [searchMethod, setSearchMethod] = useState("local");
    const [parksData, setParksData] = useState(originParksData);
    const cardPerPage = 12;
    const originTotalPage = originParksData.length / cardPerPage;

    useDebouncedEffect(() => searchOnchange(), [searchVal], 250);

    useEffect(() => {
        setIsLoading(false);
        setDefaultTotalPage(originTotalPage);
        const searchValue = localStorage.getItem("search_value");
        const searchMethod = localStorage.getItem("search_method");
        const currentPage = localStorage.getItem("current_page");
        if (searchValue !== null) setSearchVal(searchValue);
        if (searchMethod !== null) setSearchMethod(searchMethod);
        if (currentPage !== null) setCurrPage(currentPage);
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
        if (searchVal === "" || searchVal.length === 1) {
            setParksData(originParksData);
            setIsSearch(false);
            setDefaultTotalPage(originTotalPage);
            return;
        }

        setIsSearch(true);
        if (searchMethod === "local") {
            filter(originParksData.slice((currPage - 1) * 12, currPage * 12));
            setDefaultTotalPage(originTotalPage);
        } else if (searchMethod === "global") {
            const globalData = filter(originParksData);
            setParksData(globalData);

            let globalTotalPage = globalData.length / cardPerPage;
            if (globalTotalPage % 1 !== 0)
                globalTotalPage = Math.floor(globalTotalPage) + 1;

            if (currPage > globalTotalPage) setCurrPage(1);

            setDefaultTotalPage(globalTotalPage);
        }
    }

    function filter(data) {
        return data.filter((obj, index) => {
            if (
                obj["pm_name"].includes(searchVal) ||
                obj["pm_construction"].includes(searchVal)
            ) {
                setHighlightIndex((highlightIndex) => [
                    ...highlightIndex,
                    index,
                ]);
                return obj;
            } else {
                return false;
            }
        });
    }

    function setDefaultTotalPage(totalPage) {
        if (totalPage % 1 === 0) {
            setTotalPage(totalPage);
        } else {
            setTotalPage(Math.floor(totalPage) + 1);
        }
    }

    function cardClick(method, index) {
        localStorage.setItem("search_method", searchMethod);
        localStorage.setItem("search_value", searchVal);
        localStorage.setItem("current_page", currPage);

        if (method === "local" || (method === "global" && isSearch === false))
            navigate(`/park-view/${(currPage - 1) * 12 + index}`);
        else if (method === "global" && isSearch === true)
            navigate(
                `/park-view/${highlightIndex[(currPage - 1) * 12 + index]}`
            );
    }

    function showCard(method) {
        let data;
        if (method === "local") data = originParksData;
        else if (method === "global") data = parksData;
        return data
            .slice((currPage - 1) * 12, currPage * 12)
            .map((r, index) => (
                <div
                    className={
                        method === "local"
                            ? highlightIndex.includes(index)
                                ? "card highlight"
                                : "card no-highlight"
                            : isSearch === true
                            ? "card highlight"
                            : "card no-highlight"
                    }
                    key={index}
                    onClick={() => cardClick(method, index)}
                >
                    <div className="header">
                        <div className="title">{r.pm_name}</div>
                        <div className="remark text-center">
                            {r.pm_construction}
                        </div>
                    </div>

                    <div className="desc">{r.pm_overview}</div>
                </div>
            ));
    }

    return (
        <>
            <div className="park-list-wrapper">
                {isLoading === true && <div className="loader"></div>}

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
                                        const method =
                                            searchMethod === "local"
                                                ? "global"
                                                : "local";
                                        localStorage.setItem(
                                            "search_method",
                                            method
                                        );
                                        return method;
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
                        value={searchVal}
                        onChange={(e) => {
                            setSearchVal(e.target.value);
                        }}
                    />
                    <div className="card-columns">{showCard(searchMethod)}</div>
                </div>

                <footer className="footer text-center">
                    <span
                        className={currPage !== 1 ? "link" : ""}
                        onClick={() => loadPage("start")}
                    >
                        {"|< "}
                    </span>

                    <span className="tab"></span>

                    <span
                        className={currPage !== 1 ? "link" : ""}
                        onClick={() => loadPage("prev")}
                    >
                        {"<"}
                    </span>

                    <span className="tab"></span>

                    {` ${currPage}/${totalPage} `}

                    <span className="tab"></span>

                    <span
                        className={currPage !== totalPage ? "link" : ""}
                        onClick={() => loadPage("next")}
                    >
                        {">"}
                    </span>

                    <span className="tab"></span>

                    <span
                        className={currPage !== totalPage ? "link" : ""}
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
