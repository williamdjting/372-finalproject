import React from 'react'
import '../../stylesheets/navbar.css';


const NavBar = () => {
    return (

        <div className="nav">
            <p className="logo">GroupStock</p>
           
            <ul>
                <li>
                    <a href="/yourwatchlists">Your Watchlists</a>

                </li>

                <li>
                    <a href="/creategroup">Create Group</a>
                </li>

                <li>
                    <a href="/login">Logout</a>

                </li>
                </ul>
             
        </div>
    );


};
export default NavBar;