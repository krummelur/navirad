export const lonLatZoomToZXY = ({ lon, lat, z = 12 }) => {
    let n = Math.pow(2, z)
    let lat_rad = degToRad(lat)
    let xtile = n * ((lon + 180) / 360)
    let ytile = n * (1 - (Math.log(Math.tan(lat_rad) + sec(lat_rad)) / Math.PI)) / 2;
    return { z: z, x: Math.floor(xtile), y: Math.floor(ytile), xRem: fract(xtile), yRem: fract(ytile) };
}

export const zxyToTileCenter = ({z,x,y}) => {
    x = x+0.5;
    y = y+0.5;
    let n = Math.pow(2, z);
    let lon_deg = x / n * 360.0 - 180.0
    let lat_rad = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n)))
    let lat_deg = radToDeg(lat_rad)
    return({lon: lon_deg, lat: lat_deg})
}

const fract = (num) => num - Math.trunc(num)
export const degToRad = (a) =>  a * (Math.PI / 180.0);
const radToDeg = (a) => a * (180.0 / Math.PI);

const sec = (a) => 1/Math.cos(a)