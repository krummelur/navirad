import React, { Component } from 'react';
import "./Radar.css";
const assert = require('assert');
const pixels = require('image-pixels');
const output = require('image-output');

class Radar extends Component {
    constructor(props) {
        Math.fract = (num) => num - Math.trunc(num);
        super(props);
        this.state = {
            relBoatPos: { x: 255, y: 255 }
        };
        console.log(props);
    }

    pixelDataToHeight = (r, g, b) => ((r * 256 + g + b / 256) - 32768);

    zxyToImageUrl = ({ z, x, y }) => "https://tile.nextzen.org/tilezen/terrain/v1/256/terrarium/" + z + "/" + x + "/" + y + ".png?api_key=rSE_grk_QHGf-QgaYe5bNA"

    referenceMapUrl() {
        let zxy = this.lonLatZoomToZXY(this.props.radarCenter);
        return "https://maps.wikimedia.org/osm-intl/" + zxy.z + "/" + zxy.x + "/" + zxy.y + ".png"
    }

    //Will be called whenever one of the props changes.
    //However, needs to implemented that there are 2 different updates
    //When the center position is changed, this requires fetching new images and calculating a heightmap
    //And when the boatposition or radar settings change, these only require a redraw of the radar image.
    componentDidUpdate() {
        //let img = document.getElementById("map");
        let zxy = this.lonLatZoomToZXY(this.props.radarCenter);
        let imageUrl = this.zxyToImageUrl(zxy);
        pixels(imageUrl).then((obj) => {
            this.state.relBoatPos = { x: zxy.xRem * obj.width, y: zxy.yRem * obj.height };
            console.log(this.state);
            let cnv = document.getElementById("canvas");
            let y = 0;
            while (y < obj.height) {
                let x = 0;
                while (x < obj.width) {
                    let pix = this.pixelDataAt(x, y, obj.width, obj.data)
                    let height = Math.max(this.pixelDataToHeight(pix.r, pix.g, pix.b), 0) * 5;
                    (this.pixelDataToHeight(pix.r, pix.g, pix.b) > 8) || (height = 0)
                    let index = this.indexFromPos(x, y, obj.width);
                    obj.data[index] = height;
                    obj.data[index + 1] = height;
                    obj.data[index + 2] = height;
                    x++;
                }
                y++;
            }
            this.state.currentHeightmap = obj;

            let boatIndex = this.indexFromPos(this.state.relBoatPos.x, this.state.relBoatPos.y, 512);
            obj.data[boatIndex++] = 255;
            obj.data[boatIndex++] = 0;
            obj.data[boatIndex++] = 0;
            output(obj, cnv);
            let newPixelData = this.processImage(obj, this.state.relBoatPos)
            output(newPixelData, cnv)
        })
    }

    pixelDataAt(x, y, width, data) {
        let baseIndex = this.indexFromPos(Math.floor(x), Math.floor(y), width);
        return {
            r: data[baseIndex + 0],
            g: data[baseIndex + 1],
            b: data[baseIndex + 2],
            a: data[baseIndex + 3]
        }
    }

    indexFromPos(x, y, width) {
        return (Math.floor(x) + Math.floor(y) * width) * 4
    }

    processImage({ data, width, height }, bp) {
        let newPixelData = new Uint8ClampedArray(width * height * 4);
        let i = 0;
        while (i < width * height * 4) {
            newPixelData[i++] = 0;
            newPixelData[i++] = 0;
            newPixelData[i++] = 0;
            newPixelData[i++] = 255;
        }

        let angle = 0.0;
        let beamwidthRad = this.degToRad(this.props.radarSettings.beamwidth);
        console.log(this.props.radarSettings.beamwidth);
        while (angle < Math.PI * 2) {
            this.castRayInNormDirection({ newPixelData, data, width, height }, { x: Math.sin(angle), y: Math.cos(angle) }, bp)
            //Angle is decided from the bemwidth
            angle += beamwidthRad;
        }

        //let cnv = document.getElementById("canvas");
        return { data: newPixelData, width: width, height: height };
    }

    castRayInNormDirection(image, dir, bp) {
        let nextPos = { x: bp.x, y: bp.y };
        let isHit = false;
        let min = 10;
        image.newPixelData[this.indexFromPos(bp.x, bp.y, image.width)] = 255;
        while (nextPos.x > 0 && nextPos.y > 0 && nextPos.x < image.width && nextPos.y < image.height && !isHit) {
            let pixelAtPos = this.pixelDataAt(Math.floor(nextPos.x), Math.floor(nextPos.y), image.width, image.data).g;
            min = pixelAtPos >= min ? pixelAtPos : min;
            nextPos = { x: nextPos.x + dir.x, y: nextPos.y + dir.y };
            if (pixelAtPos === min) {
                image.newPixelData[this.indexFromPos(nextPos.x, nextPos.y, image.width) + 1] = pixelAtPos;
                //Approximation of errors due to beamwidth
                let bpdeltax = nextPos.x-bp.x;
                let bpdeltay = nextPos.y-bp.y;
                let distanceFromOrigin = Math.sqrt(bpdeltax*bpdeltax + bpdeltay*bpdeltay);
                //let totalCircumference = Math.PI * distanceFromOrigin*2;
                //let errorLength = totalCircumference / this.degToRad(this.props.radarSettings.beamwidth);
                let errorLength = distanceFromOrigin * this.degToRad(this.props.radarSettings.beamwidth);
                let mat = [0,-1,1,0];
                let errorDir = {x: dir.x*mat[0] + dir.y*mat[2],
                    y: (dir.x*mat[1] + dir.y*mat[3])};
                let nextErrLocation = {...nextPos};
                let errTraced = 0;
                while (errTraced < errorLength){
                    image.newPixelData[this.indexFromPos(Math.round(nextErrLocation.x), Math.round(nextErrLocation.y), image.width) +1] = pixelAtPos*4;
                    nextErrLocation.x+=errorDir.x;
                    nextErrLocation.y+=errorDir.y;
                    errTraced += 1;
                }

            } else if (pixelAtPos < min - 30) //approximation of the radar "seeing over" things.
                isHit = true;
        }
        return isHit;
    }

    onButton(bp) {
        //this.props.setRadarCenter({ lon: 18.68283705, lat: 59.24407017 })
        //this.props.setRadarCenter({ lon: 18.59539415, lat: 59.16455698 })
        //this.props.setRadarCenter({ lon: 18.92678799, lat: 59.52635936 })
        //this.props.setRadarCenter({ lon: 18.82464508, lat: 59.53819451 })
        this.props.setRadarCenter({ lon: 18.58, lat: 59.09 })

        //Make a nice little animation
        let testing = true;
        testing || setInterval(() => {
            this.state.relBoatPos = {
                x: this.state.relBoatPos.x + 1,
                y: this.state.relBoatPos.y + 1,
            };
            let cnv = document.getElementById("canvas");
            if (this.state.currentHeightmap !== undefined)
                output(this.processImage(this.state.currentHeightmap, this.state.relBoatPos), cnv)
        }, 50)
    }

    degToRad(a) {
        return a * (Math.PI / 180.0);
    }

    sec = (a) => {
        assert(a !== Math.PI / 2);
        return 1/Math.cos(a);
    };

    lonLatZoomToZXY = ({ lon, lat, z = 12 }) => {
        let n = Math.pow(2, z)
        let lat_rad = this.degToRad(lat)
        let xtile = n * ((lon + 180) / 360)
        let ytile = n * (1 - (Math.log(Math.tan(lat_rad) + this.sec(lat_rad)) / Math.PI)) / 2;
        return { z: z, x: Math.floor(xtile), y: Math.floor(ytile), xRem: Math.fract(xtile), yRem: Math.fract(ytile) };
    };

    render() {
        return (
            <div className="radar-container">
                <div className="latlong-container">
                    <p>Current location: <span>Lat goes here</span>, <span>Long goes here</span></p>
                </div>


                <div className="minimap-container">
                    <img src={this.referenceMapUrl()} style={{ width: 256, height: 256 }} id="map" alt="logo" />
                </div>

                <div className="canvas-container">
                    <canvas id="canvas" alt="radar" />
                </div>

                <div className="temporary-button">
                    <button onClick={() => { this.onButton({ x: 50, y: 50 }) }} >Click</button>
                </div>
            </div>
        )
    }
}
export default Radar;