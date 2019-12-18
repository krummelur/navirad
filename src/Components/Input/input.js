import React, { Component } from 'react';
import "./input.css";

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleInputChange(event) {
        event.preventDefault();

        this.props.sendData({
            ID: this.props.placeholder,
            value: event.target.value
        });
    }

    render() {
        return (
            <input 
                type={this.props.type}
                placeholder={this.props.placeholder}
                autoComplete="on"
                onChange={this.handleInputChange.bind(this)}
            />
        );
    }
}

export default Input;