import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDespesa } from '../redux/actions';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentacao',
};
class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
    };
  }

  changeInput = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  createExpense = () => {
    const { dispatch } = this.props;
    dispatch(fetchDespesa(this.state));
    this.setState(initialState);
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
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
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
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.createExpense }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
