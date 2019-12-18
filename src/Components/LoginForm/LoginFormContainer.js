import { connect } from 'react-redux';
import LoginForm from "./LoginForm";
import {setStartupToggle} from "../../data/actions/toggleStartupActions";

const mapStateToProps = state => ({
    toggleStartup: state.toggleStartup
})

const mapDispatchToProps = dispatch => {
    return {
      setStartupToggle: toggleStartup => dispatch(setStartupToggle(toggleStartup))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);