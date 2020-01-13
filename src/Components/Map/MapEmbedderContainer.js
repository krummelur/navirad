import { connect } from 'react-redux';
import MapEmbedder from './MapEmbedder';
import { setRadarCenter } from '../../data/actions/radarActions'
import { fetchPlacesAction, addPlaceAction } from '../../data/actions/placesActions'
import {  } from '../../data/actions/radarActions'

const mapStateToProps = state => ({
    radarCenter: state.radarSettings.radarCenter,
});

const mapDispatchToProps = dispatch => {
    return {
    setRadarCenter: newCenter => dispatch(setRadarCenter(newCenter)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapEmbedder);