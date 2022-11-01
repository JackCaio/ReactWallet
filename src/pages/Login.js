import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, loginMail } from '../redux/actions';

const MIN_PASS_LENGTH = 6;
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
    };
  }

  changeInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  validMail = () => {
    const { user } = this.state;
    const regex = /\S+@\S+\.\S+/;
    return regex.test(user);
  };

  validPass = () => {
    const { password } = this.state;
    return password.length >= MIN_PASS_LENGTH;
  };

  validForm = () => (!(this.validMail() && this.validPass()));

  handleLogin = () => {
    const { user } = this.state;
    const { dispatch, history: { push } } = this.props;
    dispatch(loginMail(user));
    dispatch(fetchCurrency());
    push('/carteira');
  };

  render() {
    // return <div>Login</div>;
    const { user, password } = this.state;
    return (
      <div>
        <label htmlFor="user">
          Mail
          <input
            type="email"
            name="user"
            id="user"
            onChange={ this.changeInput }
            value={ user }
            className={ this.validMail() ? 'valid' : 'invalid' }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Pass
          <input
            type="password"
            name="password"
            id="password"
            onChange={ this.changeInput }
            value={ password }
            className={ this.validPass() ? 'valid' : 'invalid' }
            data-testid="password-input"
          />
          <button
            type="button"
            disabled={ this.validForm() }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </label>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
