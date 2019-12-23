import React, { Component } from 'react';
import "./message.css";

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="usermessage" style={this.props.style}>
                {this.props.usermessage}
            </div>
        );
    }

}

export default Message;