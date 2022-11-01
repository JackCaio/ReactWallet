import { ADICIONA_DESPESA, RECEIVE_CURRENCY } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const addExpenses = (curState, { exchangeRates, expenseData }) => {
  const { value, description, currency, method, tag } = expenseData;
  return [
    ...curState.expenses, {
      id: curState.expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    },
  ];
};

const wallet = (state = INITIAL_WALLET, action) => {
  switch (action.type) {
  case RECEIVE_CURRENCY:
    return {
      ...state,
      currencies: action.currency,
    };
  case ADICIONA_DESPESA:
    return {
      ...state,
      expenses: addExpenses(state, action),
    };
  default:
    return state;
  }
};

export default wallet;
