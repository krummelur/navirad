import React, { Component } from 'react';
import "./Button.css";

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
    return (<button className="button" onClick={this.props.function}>{this.props.title}</button>);
    }
}

export default Button;