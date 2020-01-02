import React, { useState }from "react";
import PropTypes from "prop-types";
import "../Shared-Styles/View-Menu.css";
import NavigationControlsContainer from "../NavigationControls/NavigationControlsContainer";

RadarMenu.propTypes = {
    setBeamWidth: PropTypes.func.isRequired,
    beamWidth: PropTypes.number.isRequired
};



function RadarMenu(props) {
    const [storedText, setStoredText] = useState("");
        return (
            <div className="view-menu-container">
                <div className="large-text">Radar Controls</div>
                <div className="slider-outer">
                    <p className="medium-text">Beam width: <span>{props.beamWidth}</span></p>
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
                            <input type="checkbox" id="checkboxOne"
                            onChange={evt => {props.setRainInterference(evt.target.checked)}}/>
                            <label htmlFor="checkboxOne">Rain clutter</label>
                        </li>
                        <li>
                            <input type="checkbox" id="checkboxTwo"
                            onChange={evt => {props.setRadarInterference(evt.target.checked)}}/>
                            <label htmlFor="checkboxTwo">Radio interference</label>
                        </li>
                        <li>
                            <input type="checkbox" id="checkboxThree"
                            onChange={evt => {props.setUnderlay(evt.target.checked)}}/>
                            <label htmlFor="checkboxThree">Radar/map overlay</label>
                        </li>
                        <li>
                            <input type="checkbox" id="checkboxFour"/>
                            <label htmlFor="checkboxFour">Other boats (to be implemented)</label>
                        </li>
                        <li>
                            <input type="text" placeholder="Name your location"
                            onChange={evt => setStoredText(evt.target.value)}>
                            </input>
                            <input type="submit" value="Save location"
                            onClick={() =>{props.addPlace({...props.radarCenter, name: storedText})}}/>
                        </li>
                        <li>
                        <p className="medium-text">Click and drag in the joystick area<br/>to control the radars position.</p>
                           <NavigationControlsContainer/>
                        </li>
                    </ul>
                </div>
            </div>
        );
}

export default RadarMenu;
