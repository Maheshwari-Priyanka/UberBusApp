import React from 'react'
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className='container maint-cnt'>
            <div className="header-nav">
                <span className="mytext1"> Uber Bus App </span>
                <span>
                    <Link to="/signin" className="navigation"> Sign In </Link>
                    <br />
                    <br />
                    <Link to="/signup" className="navigation"> Sign Up </Link>
                    <br />
                    <br />
                    <Link to="/booking" className="navigation"> New Booking </Link>
                    <br />
                    <br />
                    <Link to="/booking" className="navigation"> View Bookings </Link>
                </span>
            </div>
        </div>
    )
}