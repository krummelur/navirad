import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <div className="App-title">
                    NaviRad
                    {this.props.children}
                </div>
            </header>
        );
    }
}

export default Header;
