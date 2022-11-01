import { ADICIONA_DESPESA, DELETE_DESPESA, RECEIVE_CURRENCY } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const addExpenses = (curState, { exchangeRates, expenseData }) => {
  const { value, description, currency, method, tag } = expenseData;
  const { expenses } = curState;
  const id = (expenses.length === 0) ? 0 : expenses[expenses.length - 1].id + 1;
  return [
    ...curState.expenses, {
      id,
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
  case DELETE_DESPESA:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== parseFloat(action.id)),
    };
  default:
    return state;
  }
};

export default wallet;
