import { connect } from 'react-redux';
import Radar from './Radar'
import { setRadarCenter } from '../../data/actions/radarActions'


const mapStateToProps = state => ({
    radarCenter: state.radarSettings.radarCenter,
    radarSettings: state.radarSettings
});

const mapDispatchToProps = dispatch => {
    return {
        setRadarCenter: newCenter => dispatch(setRadarCenter(newCenter))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Radar);