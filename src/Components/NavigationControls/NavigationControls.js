import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NavigationControls.css";
import joystick_img from '../../media/controls-joystick.png'
import joystick_img_dark from '../../media/controls-joystick-dark.png'
import { radToDeg } from '../../helpers/mapHelpers'

class NavigationControls extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relMousePos: {x: 0, y:0},
            bounds: {x: 200, y: 200}
        }
        this.timeoutRef = null;
        this.maxMoveDist = 0.0006;
        this.imageElem = null;
    }

    stopMoving() {
        console.log("stopmovieng")
        this.imageElem.style.setProperty('--grad-end', 512) 
        clearTimeout(this.timeoutRef)
    }

    componentDidMount() {
        this.imageElem = document.getElementsByClassName("joystick-bg")[0]
    }
    
    onMouseMove(evt) {
        let rect = evt.target.getBoundingClientRect();
        let relPos = {x: evt.clientX - rect.left, y: evt.clientY - rect.top}
        this.setState({relMousePos: relPos})
        this.imageElem.style.setProperty('--grad-rot', 
          radToDeg(Math.atan2(relPos.x-this.state.bounds.x/2, -relPos.y+this.state.bounds.y/2)));
    }

    startMoving() {
        this.imageElem.style.setProperty('--grad-end', 70) 
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
            onMouseLeave={() => {this.stopMoving()}} 
            onMouseUp={() =>{this.stopMoving()}}
            style={{background: `url(${joystick_img_dark})`, backgroundSize: "cover"}}>
            <div className="joystick-bg" style={{background: `url(${joystick_img})`, backgroundSize: "cover"}} />
            </div>
        )
    } 
}



export default NavigationControls;