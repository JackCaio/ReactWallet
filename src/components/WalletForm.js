import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { confirmEdit, fetchDespesa } from '../redux/actions';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  editExpense: {},
};
class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      editExpense: {},
    };
  }

  // componentDidMount() {
  //   const { wallet: { currencies }, dispatch } = this.props;
  //   if (currencies.length === 0) {
  //     dispatch(fetchCurrency());
  //   }
  // }

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

  commitEdition = () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, editExpense } = this.state;
    const expenseData = {
      ...editExpense, value, description, currency, method, tag,
    };
    dispatch(confirmEdit(expenseData));
    this.setState(initialState);
  };

  setExpenseEdition = () => {
    const { wallet: { expenses, idToEdit } } = this.props;
    const editExpense = expenses.find((ex) => ex.id === idToEdit);
    const { value, description, currency, method, tag } = editExpense;
    this.setState({
      value, description, currency, method, tag, editExpense,
    });
  };

  render() {
    const { value, description, currency, method, tag, editExpense } = this.state;
    const { wallet: { currencies, editor, idToEdit } } = this.props;
    const condId = (Object.keys(editExpense).length === 0 || editExpense.id !== idToEdit);
    if (editor === true && condId) {
      this.setExpenseEdition();
    }
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
          onClick={ (editor) ? this.commitEdition : this.createExpense }
        >
          { (editor) ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    editor: PropTypes.bool,
    idToEdit: PropTypes.number,
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

export default connect(mapStateToProps)(WalletForm);
