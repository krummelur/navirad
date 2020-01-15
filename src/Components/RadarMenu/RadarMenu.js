import React, {useState} from "react";
import PropTypes from "prop-types";
import "../Shared-Styles/View-Menu.css";
import NavigationControlsContainer from "../NavigationControls/NavigationControlsContainer";
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles} from '@material-ui/core/styles';

const StyledTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: 'rgba( 72,110,136,1)',
        color: 'rgb(211, 211, 211)',
        fontSize: 15,
        marginRight: 35,
    },
}))(Tooltip);

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
                <p className="medium-text">Beam width: <span>{props.beamWidth}°</span></p>
                <StyledTooltip
                    title="Beam width changes the width of the radio wave. Real radars have a limited width, usually 2-6°. Details are lost within a beam, as a beam only returns one echo."
                    placement="left">
                    <input className="slider" type="range" min="0.5" max="15" step="0.5"
                           value={props.beamWidth}
                           onChange={evt => props.setBeamWidth(parseFloat(evt.target.value))}/>
                </StyledTooltip>

            </div>

            <div className="medium-text">Other properties:
                <ul className="ks-cboxtags">
                    <StyledTooltip
                        title="Rain clutter simulates interference from heavy rain. When the radar beam hits rain, it echoes and it shows up as clutter on the screen."
                        placement="left">
                        <li>
                            <input type="checkbox" id="checkboxOne"
                                   defaultChecked={props.rainInterference}
                                   onChange={evt => {
                                       props.setRainInterference(evt.target.checked)
                                   }}/>
                            <label htmlFor="checkboxOne">Rain clutter</label>
                        </li>
                    </StyledTooltip>

                    <StyledTooltip
                        title="Radio interference simulates constructive interference from other radars' radio waves. When two radars with a similar frequency and amplitude interfere each other, it can be either constructive or destructive. Destructive means that the radio waves cancel each other, constructive that the radio waves amplify each other resulting in a pattern similar to what is simulated here."
                        placement="left">
                        <li>
                            <input type="checkbox" id="checkboxTwo"
                                   defaultChecked={props.radarInterference}
                                   onChange={evt => {
                                       props.setRadarInterference(evt.target.checked)
                                   }}/>
                            <label htmlFor="checkboxTwo">Radio interference</label>
                        </li>
                    </StyledTooltip>

                    <StyledTooltip
                        title="Radar/map overlay overlays a map on the radar. There are some differences in map content between the heightmap and the actual map, why some islands don't appear on the radar."
                        placement="left">
                        <li>
                            <input type="checkbox" id="checkboxThree"
                                   defaultChecked={props.mapUnderlay}
                                   onChange={evt => {
                                       props.setUnderlay(evt.target.checked)
                                   }}/>
                            <label htmlFor="checkboxThree">Radar/map overlay</label>
                        </li>
                    </StyledTooltip>

                    <StyledTooltip
                        title="Shows other boats on the radar via the AIS protocol. The boats shown are actual real life boats and their real position (with some limitations in update frequency)"
                        placement="left">
                        <li>
                            <input type="checkbox" id="checkboxFour"
                            defaultChecked={props.otherBoats}
                            onChange={evt => {
                                props.setOtherBoats(evt.target.checked)}}
                            />
                            <label htmlFor="checkboxFour">Other boats</label>
                        </li>
                    </StyledTooltip>

                    <li>
                        <p>
                            <input type="text" placeholder="Name this location"
                                   onChange={evt => setStoredText(evt.target.value)}>
                            </input>
                            <input type="submit" value="Save location"
                                   onClick={() => {
                                       props.addPlace({...props.radarCenter, name: storedText})
                                   }}/>
                        </p>
                    </li>
                </ul>
            </div>

            <div className="joystick-area">
                <div>Use the joystick or click on the<br/>radar preview to move<br/>around using the arrow keys.</div>
                <NavigationControlsContainer/>
            </div>

        </div>
    );
}

export default RadarMenu;
