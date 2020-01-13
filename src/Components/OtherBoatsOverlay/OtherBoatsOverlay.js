import React, { Component } from "react";

class OtherBoatsOverlay extends Component {
    constructor(props) {
        super(props)
        console.log("I LIVE AGAIN!")
        this.props.fetchBoats()
    }

    render() {
        return <React.Fragment/>
    }
}

export default OtherBoatsOverlay