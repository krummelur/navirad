export const lonLatZoomToZXY = ({ lon, lat, z = 12 }) => {
    let n = Math.pow(2, z)
    let lat_rad = degToRad(lat)
    let xtile = n * ((lon + 180) / 360)
    let ytile = n * (1 - (Math.log(Math.tan(lat_rad) + sec(lat_rad)) / Math.PI)) / 2;
    return { z: z, x: Math.floor(xtile), y: Math.floor(ytile), xRem: fract(xtile), yRem: fract(ytile) };
}

const fract = (num) => num - Math.trunc(num)
export const degToRad = (a) =>  a * (Math.PI / 180.0);
const sec = (a) => 1/Math.cos(a)