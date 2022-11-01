// Coloque aqui suas actions
export const LOGIN_MAIL = 'LOGIN_MAIL';
export const loginMail = (email) => ({
  type: LOGIN_MAIL,
  email,
});

export const SEARCH_CURRENCY = 'SEARCH_CURRENCY';
export const searchCurrency = () => ({
  type: SEARCH_CURRENCY,
});

export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const receiveCurrency = (currency) => ({
  type: RECEIVE_CURRENCY,
  currency,
});

export const fetchCurrency = () => (dispatch) => {
  dispatch(searchCurrency());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currency) => {
      const currencyArray = Object.keys(currency).filter((curr) => curr !== 'USDT');
      dispatch(receiveCurrency(currencyArray));
    });
};
