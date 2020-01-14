import {connect} from 'react-redux'
import RadarMenu from './RadarMenu'
import {setBeamWidth, setInterference, setRain, setUnderlay, setRadarCenter} from "../../data/actions/radarActions";
import {addPlaceAction} from "../../data/actions/placesActions";

const mapStateToProps = state => ({
    beamWidth: state.radarSettings.beamwidth,
    rainInterference: state.radarSettings.rainInterference,
    radarInterference: state.radarSettings.radarInterference,
    radarCenter: state.radarSettings.radarCenter,
    mapUnderlay: state.radarSettings.showMapUnderlay
});

const mapDispatchToProps = dispatch => {
    return {
        setBeamWidth: num => dispatch(setBeamWidth(num)),
        setRainInterference: shouldRain => dispatch(setRain(shouldRain)),
        setRadarInterference: shouldInterfere => dispatch(setInterference(shouldInterfere)),
        setUnderlay: shouldDisplayUnderlay => dispatch(setUnderlay(shouldDisplayUnderlay)),
        addPlace: newPlace => dispatch(addPlaceAction(newPlace)),
        setRadarCenter: newCenter => dispatch(setRadarCenter(newCenter))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RadarMenu);