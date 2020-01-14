import {connect} from 'react-redux'
import NavigationControls from './NavigationControls'
import {moveRadarCenter, setRadarCenter} from "../../data/actions/radarActions";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
    return {
        moveRadarCenter: delta => dispatch(moveRadarCenter(delta))
    }
};

export default connect(null, mapDispatchToProps)(NavigationControls);