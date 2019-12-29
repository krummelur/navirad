import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <p className="App-title">
                    NaviRad
                    {this.props.children}
                </p>
            </header>
        );
    }
}

export default Header;
