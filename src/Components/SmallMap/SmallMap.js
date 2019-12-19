import React from 'react'
import { lonLatZoomToZXY } from '../../helpers/mapHelpers'
import "../Radar/Radar.css";

const referenceMapUrl = (radarCenter) => {
    let zxy = lonLatZoomToZXY(radarCenter)
    return "https://maps.wikimedia.org/osm-intl/" + zxy.z + "/" + zxy.x + "/" + zxy.y + ".png"
};

function SmallMap(props) {
    console.log(props.radarCenter);
    return (
        <div className="smallmap-container">
            <img src={referenceMapUrl(props.radarCenter)} style={{ width: 512, height: 512 }} id="map" alt="logo" />
        </div>
    )
}

export default SmallMap;