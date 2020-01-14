import {connect} from 'react-redux';
import SmallMap from './SmallMap';

const mapStateToProps = state => ({
    radarCenter: state.radarSettings.radarCenter
});

export default connect(mapStateToProps, undefined)(SmallMap);