import {connect} from 'react-redux'
import KeyboardNavigation from './KeyboardNavigation'
import {moveRadarCenter} from "../../data/actions/radarActions";

const mapStateToProps = state => ({
    places: state.places
});

const mapDispatchToProps = dispatch => {
    return {
        moveRadarCenter: (center) => dispatch(moveRadarCenter(center))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(KeyboardNavigation);