import React from 'react'

const referenceMapUrl = (radarCenter) => {
    let zxy = lonLatZoomToZXY(radarCenter)
    return "https://maps.wikimedia.org/osm-intl/" + zxy.z + "/" + zxy.x + "/" + zxy.y + ".png"
}

const sec = (a) => {
    return 1/Math.cos(a);
}

const degToRad = (a) =>  a * (Math.PI / 180.0);

const lonLatZoomToZXY = ({ lon, lat, z = 12 }) => {
    let n = Math.pow(2, z)
    let lat_rad = degToRad(lat)
    let xtile = n * ((lon + 180) / 360)
    let ytile = n * (1 - (Math.log(Math.tan(lat_rad) + sec(lat_rad)) / Math.PI)) / 2;
    return { z: z, x: Math.floor(xtile), y: Math.floor(ytile), xRem: Math.fract(xtile), yRem: Math.fract(ytile) };
}

function SmallMap(props) {
    return (
        <img src={referenceMapUrl(props.radarCenter)} style={{ width: 256, height: 256 }} id="map" alt="logo" />
    )
}

export default SmallMap;