import { connect } from 'react-redux'
import MapMenu from './MapMenu'
import {setRadarCenter} from "../../data/actions/radarActions";
import {fetchPlacesAction, removePlaceAction} from "../../data/actions/placesActions";

const mapStateToProps = state => ({
    places: state.places
});

const mapDispatchToProps = dispatch => {
    return {
        fetchPlaces: () => dispatch(fetchPlacesAction()),
        removePlace: (place) => dispatch(removePlaceAction(place)),
        setRadarCenter: (center) => dispatch(setRadarCenter(center))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapMenu);