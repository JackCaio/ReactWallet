import { LOGIN_MAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_USER = {
  email: '',
};

const user = (state = INITIAL_USER, action) => {
  switch (action.type) {
  case LOGIN_MAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
