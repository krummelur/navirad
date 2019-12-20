/* Workaround for losing react Context inside google.maps.InfoWindow components. See 
 * https://stackoverflow.com/questions/53615413/how-to-add-a-button-in-infowindow-with-google-maps-react 
 * for more info
 * See also https://reactjs.org/docs/hooks-effect.html
 */

import { InfoWindow } from 'google-maps-react';
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom'

export default function InfoWindowWrapper(props) {
    const [infoWindowRef] = useState(React.createRef());
    const [contentElement] = useState(document.createElement(`div`));
    const prevChildrenRef = useRef();
    
    useEffect(() => {
        //Only re-render when something changed
        const prevChildren = prevChildrenRef.current;
        if (props.children !== prevChildren) {
            ReactDOM.render(
                React.Children.only(props.children),
                contentElement
            );
            infoWindowRef.current.infowindow.setContent(contentElement);
        }
    })
    
    useEffect(() => {
        prevChildrenRef.current = props.children;
    });

    return <InfoWindow ref={infoWindowRef} {...props} />;
}