import React, { Component } from "react";
import "./KeyboardNavigation.css";

const listenKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

class KeyboardNavigation extends Component {
    constructor(props) {
        super(props);
        this.maxMoveDist = 0.0006;
        this.arrowsPressed = {};
        this.isMovingByArrows = false;
        //Bound functions are not identical save the bound version, so event listeners can be removed
        this.handleKeyUpCallback = this.handleKeyUp.bind(this);
        this.handleKeyDownCallback = this.handleKeyDown.bind(this);
    }

    componentWillUnmount() {
        this.removeListeners();
        this.stopMovingByArrows();
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
        let movement = {lat: 0, lon: 0};
        if (this.arrowsPressed[listenKeys[0]]) movement.lat += arrowMaxMoveDist / 2;
        if (this.arrowsPressed[listenKeys[1]]) movement.lat -= arrowMaxMoveDist / 2;
        if (this.arrowsPressed[listenKeys[2]]) movement.lon -= arrowMaxMoveDist;
        if (this.arrowsPressed[listenKeys[3]]) movement.lon += arrowMaxMoveDist;

        this.props.moveRadarCenter(movement);
        this.arrowsTimeoutRef = setTimeout(() => this.startMovingByArrows(), 35);
    }

    stopMovingByArrows() {
        clearTimeout(this.arrowsTimeoutRef);
        this.arrowsPressed = {};
        this.arrowsTimeoutRef = undefined;
    }

    handleKeyDown (e) {
        let isFirstKey = this.noKeysPressed();
        if (listenKeys.includes(e.code)) {
            e.preventDefault();
            this.arrowsPressed[e.code] = true;
            if (isFirstKey)
                this.startMovingByArrows();
        }
    }

    handleKeyUp(e) {
        if (listenKeys.includes(e.code)) {
            e.preventDefault(); 
            this.arrowsPressed[e.code] = false;
        }
        if (this.noKeysPressed())
            this.stopMovingByArrows();
    }

    removeListeners() {
        let thiselem = document.getElementById("keyboardnavigation");
        thiselem.removeEventListener("keydown", this.handleKeyDownCallback);    
        thiselem.removeEventListener("keyup", this.handleKeyUpCallback);
    }

    setUpKeyListeners() {
        let thiselem = document.getElementById("keyboardnavigation");
        thiselem.addEventListener("keydown", this.handleKeyDownCallback);    
        thiselem.addEventListener("keyup", this.handleKeyUpCallback);
    }
    
    componentDidMount() {
        this.setUpKeyListeners();
    }

    render() {
        return (
        <div id="keyboardnavigation" tabIndex="0" onBlur={this.stopMovingByArrows.bind(this)}/>
        )}
}

export default KeyboardNavigation;