import { connect } from 'react-redux';
import MapEmbedder from './MapEmbedder';
import { setRadarCenter } from '../../data/actions/radarActions'

const mapStateToProps = state => ({
    radarCenter: state.radarSettings.radarCenter
});

const mapDispatchToProps = dispatch => {
    return {
    setRadarCenter: newCenter => dispatch(setRadarCenter(newCenter))
    }
};

export default connect(null, mapDispatchToProps)(MapEmbedder);