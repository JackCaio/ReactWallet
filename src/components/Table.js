import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteDespesa } from '../redux/actions';

class Table extends Component {
  deleteExpense = (event) => {
    const { name } = event.target;
    const { dispatch } = this.props;
    dispatch(deleteDespesa(name));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const currency = Object.values(expense.exchangeRates)
              .find((rate) => rate.code === expense.currency);
            const value = parseFloat(expense.value) * parseFloat(currency.ask);
            return (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{parseFloat(expense.value).toFixed(2)}</td>
                <td>{currency.name}</td>
                <td>{parseFloat(currency.ask).toFixed(2)}</td>
                <td>{value.toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    name={ expense.id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.deleteExpense }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
