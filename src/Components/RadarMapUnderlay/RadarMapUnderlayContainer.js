import { connect } from 'react-redux';
import { setRadarCenter } from '../../data/actions/radarActions'
import RadarMapUnderlay from './RadarMapUnderlay';


const mapStateToProps = state => ({
    radarCenter: state.radarSettings.radarCenter,
    shouldDisplayMap: state.radarSettings.showMapUnderlay
});

const mapDispatchToProps = dispatch => {
    return {
        setRadarCenter: newCenter => dispatch(setRadarCenter(newCenter))
    }
};

export default connect(mapStateToProps, null)(RadarMapUnderlay);