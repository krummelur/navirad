import { connect } from 'react-redux'
import RadarMenu from './RadarMenu'
import {getBeamWidth, setBeamWidth} from "../../data/actions/radarActions";

const mapStateToProps = state => ({
    beam: state.radarSettings.beamwidth,
});

const mapDispatchToProps = dispatch => {
    return {
        setBeamWidth: num => dispatch(setBeamWidth(num)),
        getBeamWidth: num => dispatch(getBeamWidth(num))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RadarMenu);