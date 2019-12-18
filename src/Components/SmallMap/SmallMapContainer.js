import { connect } from 'react-redux';
import SmallMap from './SmallMap'

const mapStateToProps = state => ({
    radarCenter: state.radarCenter
});

const mapDispatchToProps = () => {};

export default connect(mapStateToProps, mapDispatchToProps)(SmallMap);