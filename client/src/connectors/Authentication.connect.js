import {
  login,
  resetPassword,
  sendResetPassword,
  inviteAccept,
  register,
  inviteMetaByToken, 
} from 'store/authentication/authentication.actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  requestLogin: (form) => dispatch(login({ form })),
  requestRegister: (form) => dispatch(register({ form })),
  requestSendResetPassword: (email) => dispatch(sendResetPassword({ email })),
  requestResetPassword: (form, token) => dispatch(resetPassword({ form, token })),
  requestInviteAccept: (form, token) => dispatch(inviteAccept({ form, token })),
  requestInviteMetaByToken: (token) => dispatch(inviteMetaByToken({ token })),
});

export default connect(mapStateToProps, mapDispatchToProps);