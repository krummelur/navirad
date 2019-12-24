import { connect } from 'react-redux'
import RadarMenu from './RadarMenu'
import {setBeamWidth, setInterference, setRain, setUnderlay} from "../../data/actions/radarActions";

const mapStateToProps = state => ({
    beamWidth: state.radarSettings.beamwidth,
});

const mapDispatchToProps = dispatch => {
    return {
        setBeamWidth: num => dispatch(setBeamWidth(num)),
        setRainInterference: shouldRain => dispatch(setRain(shouldRain)),
        setRadarInterference: shouldInterfere => dispatch(setInterference(shouldInterfere)),
        setUnderlay: shouldDisplayUnderlay => dispatch(setUnderlay(shouldDisplayUnderlay))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RadarMenu);