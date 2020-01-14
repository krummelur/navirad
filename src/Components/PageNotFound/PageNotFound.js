import React, {Component} from 'react';
import Header from "../Header/Header";
import { withRouter } from "react-router";
import "./PageNotFound.css";

class PageNotFound extends Component {
    constructor(props) {
        super(props);
        this.enableMessage = this.enableMessage.bind(this);

        this.state = {
            displayMessage: false
        };
        
        this.timer = setTimeout(this.enableMessage, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    enableMessage() {
        this.setState({displayMessage: true});
    }

<<<<<<< HEAD
    redirect(){
       this.props.history.push("/");
=======
    redirect() {
        history.push("/");
>>>>>>> db71b53660260742f799d37c8ea3d11a3b68a470
    }

    render() {

        const {displayMessage} = this.state;

        if (!displayMessage)
            return null;

        return (
<<<<<<< HEAD
        
=======

>>>>>>> db71b53660260742f799d37c8ea3d11a3b68a470
            <div className="pagenotfound">
                <Header/>
                <div className="pagetext">
                    <h2>Either the page does not exist or you are not authorized to enter the site</h2>
                    <h2 className="headertext">Push the button to enter the frontpage</h2>
                    <button className="notexistbutton" onClick={this.redirect.bind(this)}>frontpage</button>
                </div>
            </div>
<<<<<<< HEAD
             
=======

>>>>>>> db71b53660260742f799d37c8ea3d11a3b68a470
        );
    }
}

export default withRouter(PageNotFound);