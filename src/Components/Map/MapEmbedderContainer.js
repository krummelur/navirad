import { connect } from 'react-redux';
import MapEmbedder from './MapEmbedder';
import { setRadarCenter } from '../../data/actions/radarActions'
import { fetchPlacesAction, addPlaceAction } from '../../data/actions/placesActions'
import {  } from '../../data/actions/radarActions'

const mapStateToProps = state => ({
    radarCenter: state.radarSettings.radarCenter,
    places: state.places
});

const mapDispatchToProps = dispatch => {
    return {
    fetchPlaces: () => dispatch(fetchPlacesAction()),
    setRadarCenter: newCenter => dispatch(setRadarCenter(newCenter)),
    addPlace: place => dispatch(addPlaceAction(place))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapEmbedder);