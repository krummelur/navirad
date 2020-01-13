import { connect } from 'react-redux';
import OtherBoatsOverlay from './OtherBoatsOverlay'
import { showErrorAction } from '../../data/actions/messageActions';
import { fetchBoatsAction } from '../../data/actions/otherBoatAction';


const mapStateToProps = state => ({
    otherBoats: state.otherBoats,
    radarSettings: state.radarSettings
});

const mapDispatchToProps = dispatch => {
    return {
        fetchBoats: () => dispatch(fetchBoatsAction()),
        showError: text => dispatch(showErrorAction(text))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherBoatsOverlay);