import { connect } from 'react-redux';
import RegisterForm from "./RegisterForm";
import {setStartupToggle} from "../../data/actions/toggleStartupActions";
import {userActions} from "../../data/actions/userActions";

const mapStateToProps = state => ({
    toggleStartup: state.toggleStartup
});

const mapDispatchToProps = dispatch => {

    return {
        setStartupToggle: toggleStartup => dispatch(setStartupToggle(toggleStartup)),
        addUser: user => dispatch(userActions.addUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);