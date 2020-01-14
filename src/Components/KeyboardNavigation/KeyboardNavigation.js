import React, { Component } from "react";
import OtherBoatsOverlayContainer from "../OtherBoatsOverlay/OtherBoatsOverlayContainer";
import RadarMapUnderlayContainer from "../RadarMapUnderlay/RadarMapUnderlayContainer";
import RadarContainer from "../Radar/RadarContainer";

const listenKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]

class KeyboardNavigation extends Component {
    constructor(props) {
        super(props);
        this.maxMoveDist = 0.0006;
        this.arrowsPressed = {};
        this.isMovingByArrows = false;
    }

    componentWillUnmount() {
        this.stopMovingByArrows();
        this.stopMoving();
    }

    noKeysPressed() {
        let allFalse = true;
        for (let k in this.arrowsPressed) {
            if (this.arrowsPressed[k]) {
                allFalse = false;
            }
        }
        return allFalse;
    }

    startMovingByArrows() {
        let arrowMaxMoveDist = this.maxMoveDist / 1.6;
        let movement = {lat: 0, lon: 0}
        if (this.arrowsPressed[listenKeys[0]]) movement.lat += arrowMaxMoveDist / 2;
        if (this.arrowsPressed[listenKeys[1]]) movement.lat -= arrowMaxMoveDist / 2;
        if (this.arrowsPressed[listenKeys[2]]) movement.lon -= arrowMaxMoveDist;
        if (this.arrowsPressed[listenKeys[3]]) movement.lon += arrowMaxMoveDist;

        this.props.moveRadarCenter(movement)
        this.arrowsTimeoutRef = setTimeout(() => this.startMovingByArrows(), 35);
    }

    stopMovingByArrows() {
        clearTimeout(this.arrowsTimeoutRef);
        this.arrowsTimeoutRef = undefined;
    }

    setUpKeyListeners() {
        let thiselem = document.getElementById("keyboardnavigation") 
        console.log("Setting up keylisteners")

        thiselem.addEventListener("keydown", function (e) {
            console.log("AAYAYAYAYAYsdsd")
            let isFirstKey = this.noKeysPressed();
            if (listenKeys.includes(e.code)) {
                e.preventDefault();
                this.arrowsPressed[e.code] = true;
                if (isFirstKey)
                    this.startMovingByArrows();
            }
        }.bind(this));
        
        thiselem.addEventListener("keyup", function (e) {
            if (listenKeys.includes(e.code)) {
                e.preventDefault();
                this.arrowsPressed[e.code] = false;
            }
            if (this.noKeysPressed())
                this.stopMovingByArrows();
        }.bind(this));
        
    }
    
    componentDidMount() {
        this.setUpKeyListeners();
    }

    render() {
        return (
        <div id="keyboardnavigation" tabindex="0">
            <OtherBoatsOverlayContainer/>
            <RadarMapUnderlayContainer/>
            <RadarContainer/>
        </div>)
    }


}

export default KeyboardNavigation;