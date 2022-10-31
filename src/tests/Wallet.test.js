import { screen } from '@testing-library/react';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Verifica componentes da wallet', () => {
  test('Verifica estado inicial de Header', () => {
    const INITIAL_STATE = { user: { email: 'teste@teste.com' } };
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    const user = screen.getByTestId('email-field');
    expect(user).toHaveTextContent('teste@teste.com');
    const total = screen.getByTestId('total-field');
    expect(total).toHaveTextContent('0');
    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency).toHaveTextContent('BRL');
  });
});
