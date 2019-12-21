import { connect } from 'react-redux';
import RegisterForm from "./RegisterForm";
import {userActions} from "../../data/actions/userActions";


const mapDispatchToProps = dispatch => {
  
    return {
      addUser: user => dispatch(userActions.addUser(user))
    }
  }

export default connect(null, mapDispatchToProps)(RegisterForm);