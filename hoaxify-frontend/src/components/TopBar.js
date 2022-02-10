import React from "react";
import logo from '../assets/hoaxify-logo.png';
import { Link } from "react-router-dom";

class TopBar extends React.Component {
    render() {
        return (
            <div className="bg-white shadow-sm mb-2">
                <div className="container">
                    <nav className="navbar navbar-light navbar-expand">
                        <Link to="/" className="navbar-brand">
                            <img src={logo} width="60" alt="hoaxify" /> Hoaxify
                        </Link>
                    </nav>
                </div>
            </div>
        );
    }
}


export default TopBar;
