import { connect } from 'react-redux';
import Radar from './Radar'

const mapStateToProps = state => ({
    radarCenter: state.radarCenter,
    radarSettings: state.radarSettings
});

const mapDispatchToProps = dispatch => {
    return {
        setRadarCenter: newCenter => dispatch({type: "SET_RADAR_CENTER", payload: newCenter})
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Radar);