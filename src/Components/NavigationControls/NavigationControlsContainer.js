import {connect} from 'react-redux'
import NavigationControls from './NavigationControls'
import {moveRadarCenter} from "../../data/actions/radarActions";

const mapDispatchToProps = dispatch => {
    return {
        moveRadarCenter: delta => dispatch(moveRadarCenter(delta))
    }
};

export default connect(null, mapDispatchToProps)(NavigationControls);