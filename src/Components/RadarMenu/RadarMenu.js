import React, { Component } from "react";
import "./RadarMenu.css";

class RadarMenu extends Component {

    render() {
        return (
            <div className="radarmenu-container">
                <div className="large-text">Radar Controls</div>
                <div className="slider-outer">
                    <p className="medium-text">Lobe width: <span>Here goes the value of the slider</span></p>
                    <input className="slider" type="range" min="1" max="15" step="1"/>
                </div>

                <div className="slider-outer">
                    <p className="medium-text">Clutter dampening: <span>Here goes the amount of dampening</span></p>
                    <input className="slider" type="range" min="1" max="100" step="1"/>
                </div>

                <div className="medium-text">Other properties:
                    <ul className="ks-cboxtags">
                        <li>
                            <input type="checkbox" id="checkboxOne"/>
                            <label htmlFor="checkboxOne">Other boats</label>
                        </li>
                        <li>
                            <input type="checkbox" id="checkboxTwo"/>
                            <label htmlFor="checkboxTwo">Rain clutter</label>
                        </li>
                        <li>
                            <input type="checkbox" id="checkboxThree"/>
                            <label htmlFor="checkboxThree">Radar overlay</label>
                        </li>
                    </ul>
                </div>


            </div>
        );
    }
}

export default RadarMenu;