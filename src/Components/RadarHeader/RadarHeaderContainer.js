import { connect } from 'react-redux'
import RadarHeader from './RadarHeader'

const mapStateToProps = state => ({
    radarCenter: state.radarSettings.radarCenter
});

export default connect(mapStateToProps, undefined)(RadarHeader);