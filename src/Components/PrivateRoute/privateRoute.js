import React, {useContext} from 'react';
import {Route} from "react-router-dom";
import {AuthenticatorContext} from "../../Util/authenticator";
import PageNotFound from "../PageNotFound/PageNotFound";

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthenticatorContext);

    //Set the conditional value(true) to currentUser to implement the login function
    return (
        <Route {...rest}
               render={routeProps => {
                   if (currentUser)
                       return <RouteComponent {...routeProps} />
                   else
                       return <PageNotFound/>
               }
               }
        />
    );
};

export default PrivateRoute