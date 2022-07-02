import React from 'react'
import '../../stylesheets/navbar.css';


const NavBar = () => {
    return (

        <div className="nav">
            <p className="logo"><a href="/dashboard2">GroupStock</a></p>
           
            <ul>
                <li>
                    <a href="/dashboard6">Your Watchlists</a>

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