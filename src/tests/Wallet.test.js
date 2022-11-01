import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mail = 'test@test.com';
const currencies = Object.keys(mockData).filter((currency) => currency !== 'USDT');
describe('Verifica componentes da wallet', () => {
  test('Verifica estado inicial de Header', () => {
    const INITIAL_STATE = { user: { email: mail } };
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    const user = screen.getByTestId('email-field');
    expect(user).toHaveTextContent(mail);
    const total = screen.getByTestId('total-field');
    expect(total).toHaveTextContent('0');
    const headerCurrency = screen.getByTestId('header-currency-field');
    expect(headerCurrency).toHaveTextContent('BRL');
  });

  test('Testa formulário de adição de despesa', () => {
    const INITIAL_STATE = { user: { email: mail },
      wallet: { expenses: [], currencies } };
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    const value = screen.getByTestId('value-input');
    const desc = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    expect(value).toHaveValue(0);
    expect(desc).toHaveValue('');
    expect(currency).toHaveValue('USD');
    expect(method).toHaveValue('dinheiro');
    expect(tag).toHaveValue('alimentacao');
  });

  test('Adicionar despesa limpa inputs', () => {
    const INITIAL_STATE = { user: { email: mail },
      wallet: { expenses: [], currencies } };
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    const addDespesa = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.type(screen.getByTestId('value-input'), '50');
    userEvent.type(screen.getByTestId('description-input'), 'test');
    userEvent.click(addDespesa);
    expect(screen.getByTestId).not.toHaveValue(50);
  });
});
