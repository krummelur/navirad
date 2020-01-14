import {connect} from 'react-redux';
import MessageBox from './MessageBox';

const mapStateToProps = state => ({
    message: state.message,
});

export default connect(mapStateToProps, null)(MessageBox);