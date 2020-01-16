import React, {useContext} from 'react';
import {Route} from "react-router-dom";
import {AuthenticatorContext} from "../../Util/authenticator";
import PageNotFound from "../PageNotFound/PageNotFound";

const PrivateRoute = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useContext(AuthenticatorContext);

    return (
        <Route {...rest}
            render={routeProps => {
                    if (currentUser)
                        return <RouteComponent {...routeProps} />;
                    else
                        return <PageNotFound/>
                }
            }
        />
    );
};

export default PrivateRoute