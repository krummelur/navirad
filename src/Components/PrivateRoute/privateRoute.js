import React, { useContext } from 'react';
import {Route, Redirect} from "react-router-dom";
import {AuthenticatorContext} from "../../Util/authenticator";

const PrivateRoute =({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthenticatorContext);

    //const currentUser = true;

    //Set the conditional value(true) to currentUser to implement the login function
    return(
        <Route {...rest}
            render={routeProps => 
                currentUser ? (<RouteComponent {...routeProps} />) : (<Redirect to={"/"}/>)
            }
        />
    );
};

export default PrivateRoute