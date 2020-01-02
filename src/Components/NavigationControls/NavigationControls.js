import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NavigationControls.css";
import joystick_img from '../../media/controls-joystick.png'

class NavigationControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relMousePos: {x: 0, y:0},
            bounds: {x: 200, y: 200}
        }
        this.timeoutRef = null;
        this.maxMoveDist = 0.0006;
    }

    stopMoving(timeoutReference) {
        clearTimeout(timeoutReference)
    }
    
    onMouseMove(evt) {
        let rect = evt.target.getBoundingClientRect();
        this.setState({relMousePos: {x: evt.clientX - rect.left, y: evt.clientY - rect.top}})
    }

    startMoving() {
        let direction = this.offsetToDirection(this.state.relMousePos); 
        this.props.moveRadarCenter({lon: direction.x*this.maxMoveDist, lat: direction.y*this.maxMoveDist/2})
        this.timeoutRef = setTimeout(() => this.startMoving(), 35);
    }

    offsetToDirection(offset) {
        let directionX = offset.x/this.state.bounds.x*2 - 1;
        let directionY = -1*(offset.y/this.state.bounds.y*2 - 1);
        return {x: directionX, y: directionY}
    }
    

    render() {      
        return (
            <div className="joystick"
            onMouseMove={this.onMouseMove.bind(this)}
            onMouseDown={this.startMoving.bind(this)} 
            onMouseLeave={() => {clearTimeout(this.timeoutRef)}} 
            onMouseUp={() =>{clearTimeout(this.timeoutRef)}}>
            <img className="joystick-bg" src= {joystick_img }/>
            </div>    
        )
    } 
}




export default NavigationControls;