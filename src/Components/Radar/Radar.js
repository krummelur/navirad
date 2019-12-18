import React, { Component } from 'react';
import { isEqual } from 'lodash';
import { lonLatZoomToZXY, degToRad } from '../../helpers/mapHelpers'

const assert = require('assert');
const pixels = require('image-pixels')
const output = require('image-output')

class Radar extends Component {
  constructor(props) {
    super(props);
    //This is not part of the state becuase it should not prompt an update.
    this.state = {
      isPreparingHeightmap: false,
      currentHeightmap: undefined
    }
    this.relBoatPos = undefined;
  }

  pixelDataToHeight = (r, g, b) => ((r * 256 + g + b / 256) - 32768)

  zxyToImageUrl = ({ z, x, y }) => "https://tile.nextzen.org/tilezen/terrain/v1/256/terrarium/" + z + "/" + x + "/" + y + ".png?api_key=rSE_grk_QHGf-QgaYe5bNA"

  getSnapshotBeforeUpdate(prevProps) {
    
    console.log("isequal: " + isEqual(prevProps.radarCenter, this.props.radarCenter))
    if (isEqual(prevProps.radarCenter, this.props.radarCenter))
      return { repositionMap: false }
    else
      return { repositionMap: true }
  }

  componentDidMount() {
    
    console.log("DIDMOUNT")
    //this.setState({...this.state, isPreparingHeightmap: true})
    this.prepareForDrawing().then((heightmap) => {
      console.log("SETTING STATE")
      this.setState({...this.state, currentHeightmap: heightmap})
    })
  }

  prepareForDrawing() {
    console.log(this.props.radarCenter);
    console.log(lonLatZoomToZXY)
    let zxy = lonLatZoomToZXY(this.props.radarCenter)
    let imageUrl = this.zxyToImageUrl(zxy);
    return new Promise(function (resolve, reject) {
      pixels(imageUrl).then((obj) => {
        this.relBoatPos = { x: zxy.xRem * obj.width, y: zxy.yRem * obj.height };
        let y = 0;
        while (y < obj.height) {
          let x = 0;
          while (x < obj.width) {
            let pix = this.pixelDataAt(x, y, obj.width, obj.data)
            let height = Math.max(this.pixelDataToHeight(pix.r, pix.g, pix.b), 0) * 10;
            (this.pixelDataToHeight(pix.r, pix.g, pix.b) > 8) || (height = 0)
            let index = this.indexFromPos(x, y, obj.width);
            obj.data[index] = height;
            obj.data[index + 1] = height;
            obj.data[index + 2] = height;
            x++;
          }
          y++;
        }
        resolve(obj);
      })
    }.bind(this));
  }

  //Will be called whenever one of the props changes.
  //However, needs to implemented that there are 2 different updates
  //When the center position is changed, this requires fetching new images and calculating a heightmap
  //And when the boatposition or radar settings change, these only require a redraw of the radar image.
  componentDidUpdate(prevProps, state, snapshot) {
    console.log("SNAPSHOT")
    console.log(snapshot)
    console.log("========")
    let cnv = document.getElementById("canvas");
    if (snapshot.repositionMap) {
      this.prepareForDrawing().then((heightmap) => {
        this.state.currentHeightmap = heightmap;
        this.startContinousOutput();
      })
    }
    else {
      this.startContinousOutput();
    }
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
    if (x >= width || y >= width || y < 0 || x < 0)
      return undefined;
    return (Math.floor(x) + Math.floor(y) * width) * 4
  }

  processImage({ data, width, height }) {
    let newPixelData = new Uint8ClampedArray(width * height * 4);
    let i = 0;
    while (i < width * height * 4) {
      newPixelData[i++] = 0;
      newPixelData[i++] = 0;
      newPixelData[i++] = 0;
      newPixelData[i++] = 255;
    }

    let angle = 0.0;
    let beamwidthRad = degToRad(this.props.radarSettings.beamwidth);
    while (angle < Math.PI * 2) {
      this.castRayInNormDirection({ newPixelData, data, width, height }, { x: Math.sin(angle), y: Math.cos(angle) })
      //Angle is decided from the beamwidth
      angle += beamwidthRad;
    }
    //Add rain effect
    if (this.props.radarSettings.rainInterference)
      this.rainify(newPixelData, width, height);
    return { data: newPixelData, width: width, height: height };
  }

  rainify(image, width, height) {
    let x = 0;
    let y = 0;
    while (y < height) {
      x = 0;
      while (x < width) {
        let bpdeltax = x - this.relBoatPos.x;
        let bpdeltay = y - this.relBoatPos.y;
        let distanceFromOriginSquared = bpdeltax * bpdeltax + bpdeltay * bpdeltay;
        let someNum = 70;
        if ((Math.random() - 0.5) * distanceFromOriginSquared > someNum * someNum || Math.random() > 0.95) {

          image[this.indexFromPos(x, y, width) + 1] = 128;
        }
        x++
      }
      y++;
    }
  }

  castRayInNormDirection(image, dir) {
    let bp = this.relBoatPos;
    let nextPos = { x: bp.x, y: bp.y };
    let isHit = false;
    let min = 10;
    image.newPixelData[this.indexFromPos(bp.x, bp.y, image.width)] = 255;
    while (nextPos.x > 0 && nextPos.y > 0 && nextPos.x < image.width && nextPos.y < image.height) {
      let pixelAtPos = this.pixelDataAt(Math.floor(nextPos.x), Math.floor(nextPos.y), image.width, image.data).g;
      min = pixelAtPos >= min ? pixelAtPos : min;
      nextPos = { x: nextPos.x + dir.x, y: nextPos.y + dir.y }
      let bpdeltax = nextPos.x - bp.x;
      let bpdeltay = nextPos.y - bp.y;
      let distanceFromOriginSquared = bpdeltax * bpdeltax + bpdeltay * bpdeltay;
      if (this.props.radarSettings.radarInterference) {
        let shouldDrawRadarInterf = (Math.random() > 0.5);
        if (shouldDrawRadarInterf)
          image.newPixelData[this.indexFromPos(nextPos.x, nextPos.y, image.width) + 1] = 220;
      }
      if (pixelAtPos === min && !isHit) {
        let distanceFromOrigin = Math.sqrt(distanceFromOriginSquared);
        image.newPixelData[this.indexFromPos(nextPos.x, nextPos.y, image.width) + 1] = pixelAtPos;
        //Approximation of errors due to beamwidth
        let errorLength = distanceFromOrigin * degToRad(this.props.radarSettings.beamwidth)
        let mat = [0, -1, 1, 0];
        let errorDir = {
          x: dir.x * mat[0] + dir.y * mat[2],
          y: (dir.x * mat[1] + dir.y * mat[3])
        }
        let nextErrLocation = { ...nextPos };
        let errTraced = 0;
        while (errTraced < errorLength) {
          let index = this.indexFromPos(Math.round(nextErrLocation.x), Math.round(nextErrLocation.y), image.width);
          index && (image.newPixelData[index + 1] = pixelAtPos * 4);
          nextErrLocation.x += errorDir.x;
          nextErrLocation.y += errorDir.y;
          errTraced++;
        }
      } else if (pixelAtPos < min - 50) //approximation of the radar "seeing over" things.
        isHit = true;
    }
    return isHit;
  }

  startContinousOutput() {
    clearInterval(this.intervalReference);
    (this.intervalReference = setInterval(() => {
        this.relBoatPos.x += 0.0
        this.relBoatPos.y += 0.0
        let cnv = document.getElementById("canvas")
        //let startTime = Date.now()
        let newPixelData = this.processImage(this.state.currentHeightmap)
        //let totalTime = Date.now() - startTime
        //console.log("Render Time: " + totalTime)
        output(newPixelData, cnv)
      }, 20))
  }

  componentWillUnmount() {
    console.log("UNMOUNTING, STOPPING ANIMATION")
    clearInterval(this.intervalReference)
  }




  render() {
    return (
      <div>
        {/*
        <img src={this.referenceMapUrl()} style={{ width: 256, height: 256 }} id="map" alt="logo" />
        */}
        <canvas id="canvas" alt="radar" />

      </div>
    )
  }
}

export default Radar;