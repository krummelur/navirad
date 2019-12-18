import React from 'react'
import { lonLatZoomToZXY } from '../../helpers/mapHelpers'

const referenceMapUrl = (radarCenter) => {
    let zxy = lonLatZoomToZXY(radarCenter)
    return "https://maps.wikimedia.org/osm-intl/" + zxy.z + "/" + zxy.x + "/" + zxy.y + ".png"
}

function SmallMap(props) {
    console.log(props.radarCenter)
    return (
        <img src={referenceMapUrl(props.radarCenter)} style={{ width: 256, height: 256 }} id="map" alt="logo" />
    )
}

export default SmallMap;