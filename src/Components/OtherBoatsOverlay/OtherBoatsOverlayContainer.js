import {connect} from 'react-redux';
import OtherBoatsOverlay from './OtherBoatsOverlay'
import {showErrorAction} from '../../data/actions/messageActions';


const mapStateToProps = (state, ownProps) => ({
    otherBoats: state.otherBoats,
    radarCenter: state.radarSettings.radarCenter,
    shouldDisplayBoats: state.radarSettings.otherBoats,
    canvasid: ownProps.id,
});

const mapDispatchToProps = dispatch => {
    return {
        showError: text => dispatch(showErrorAction(text))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherBoatsOverlay);