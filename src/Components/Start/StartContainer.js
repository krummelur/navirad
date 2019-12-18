import {connect} from 'react-redux';
import Start from './Start';

const mapStateToProps = state => ({
    toggleStartup: state.toggleStartup
});

export default connect(mapStateToProps)(Start);