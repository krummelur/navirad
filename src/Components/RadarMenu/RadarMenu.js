import React from "react";
import PropTypes from "prop-types";
import "./RadarMenu.css";

RadarMenu.propTypes = {
    setBeamWidth: PropTypes.func.isRequired,
    beamWidth: PropTypes.number.isRequired
};

function RadarMenu(props){
    console.log(props.beamWidth)
        return (
            <div className="radarmenu-container">
                <div className="large-text">Radar Controls</div>
                <div className="slider-outer">
                    <p className="medium-text">Lobe width: <span>{props.beamWidth}</span></p>
                    <input className="slider" type="range" min="0.5" max="15" step="0.5" 
                    value={props.beamWidth}
                    onChange={evt => props.setBeamWidth(parseFloat(evt.target.value))}/>
                </div>

                <div className="slider-outer">
                    <p className="medium-text">Clutter dampening: <span>To be implemented</span></p>
                    <input className="slider" type="range" min="1" max="100" step="1"/>
                </div>

                <div className="medium-text">Other properties:
                    <ul className="ks-cboxtags">
                        <li>
                            <input type="checkbox" id="checkboxTwo"
                            onChange={evt => {props.setRainInterference(evt.target.checked)}}/>
                            <label htmlFor="checkboxTwo">Rain clutter</label>
                        </li>
                        <li>
                            <input type="checkbox" id="checkboxThree"
                            onChange={evt => {props.setRadarInterference(evt.target.checked)}}/>
                            <label htmlFor="checkboxThree">Radio interference</label>
                        </li>
                        <li>
                            <input type="checkbox" id="checkboxFour"/>
                            <label htmlFor="checkboxFour">Radar/map overlay (to be implemented)</label>
                        </li>
                        <li>
                            <input type="checkbox" id="checkboxOne"/>
                            <label htmlFor="checkboxOne">Other boats (to be implemented)</label>
                        </li>
                    </ul>
                </div>


            </div>
        );
}

export default RadarMenu;
