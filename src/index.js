import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ParkList from "./park-list/park-list";
import ParkView from "./park-view/park-view";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

render(
    <BrowserRouter>
        <Routes>
            <Route path="/parks" element={<ParkList />} />
            <Route path="/parks/:index" element={<ParkView />} />
            <Route path="*" element={<Navigate replace to="/parks" />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
