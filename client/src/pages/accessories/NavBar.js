import React from 'react'
import '../../stylesheets/navbar.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';




const NavBar = () => {
    return (

        <div className="nav">
            <p className="logo"><a href="/dashboard2"/>GroupStock</p>
           
            <ul>
                <li>
                    <a href="/dashboard2"> Personal Watchlist</a>

                </li>

                <li>
                    <a href="/dashboard5">Group Watchlists</a>

                </li>

                <li>
                    <a href="/dashboard9">Insights</a>

                </li>

                <li>
                    <a href="/dashboard6">Change Watchlists</a>

                </li>

                <li>
                    <a href="/dashboard3">Create Group</a>
                </li>

                <li>
                    <a href="/">Logout</a>

                </li>
                </ul>
             
        </div>
    );


};
export default NavBar;