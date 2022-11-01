import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'BRL',
      method: 'dinheiro',
      tag: 'alimentacao',
    };
  }

  changeInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      // <div>WalletForm</div>
      <div>
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            onChange={ this.changeInput }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            onChange={ this.changeInput }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            onChange={ this.changeInput }
            value={ currency }
          >
            {currencies.map((curr, i) => (
              <option key={ i } value={ curr }>{curr}</option>))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            name="method"
            id="method"
            data-testid="method-input"
            onChange={ this.changeInput }
            value={ method }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            onChange={ this.changeInput }
            value={ tag }
          >
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
