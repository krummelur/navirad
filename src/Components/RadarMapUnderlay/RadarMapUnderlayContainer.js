import {connect} from 'react-redux';
import RadarMapUnderlay from './RadarMapUnderlay';
import {lonLatZoomToZXY} from '../../helpers/mapHelpers'

const mapStateToProps = state => ({
    currentTile: lonLatZoomToZXY(state.radarSettings.radarCenter),
    shouldDisplayMap: state.radarSettings.showMapUnderlay
});

export default connect(mapStateToProps, null)(RadarMapUnderlay);