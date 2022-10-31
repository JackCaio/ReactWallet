import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    return (
      // <div>Header</div>
      <div>
        <h6 data-testid="email-field">{user}</h6>
        <p>
          <span data-testid="total-field">{expenses.length === 0 && 0}</span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
