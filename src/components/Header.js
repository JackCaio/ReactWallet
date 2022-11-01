import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user, expenses } = this.props;
    const total = expenses.reduce((acc, cur) => {
      const rates = Object.entries(cur.exchangeRates);
      const currency = rates.find((el) => el[0] === cur.currency)[1];
      const convertValue = cur.value * currency.ask;
      return acc + convertValue;
    }, 0);
    return (
      // <div>Header</div>
      <div>
        <h6 data-testid="email-field">{user}</h6>
        <p>
          <span data-testid="total-field">{parseFloat(total).toFixed(2)}</span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </div>
    );
  }
}

Header.defaultProps = {
  expenses: [],
};

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
  })),
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
