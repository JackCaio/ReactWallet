import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const mail = 'test@test.com';
const currencies = Object.keys(mockData).filter((currency) => currency !== 'USDT');
const USD = { code: 'USD', name: 'Dólar Americano/Real Brasileiro', ask: '5.00' };
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
    screen.getByTestId('value-input');
    screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    expect(currency).toHaveValue('USD');
    expect(method).toHaveValue('Dinheiro');
    expect(tag).toHaveValue('Alimentação');
  });

  test('Adicionar despesa limpa inputs', () => {
    const INITIAL_STATE = { user: { email: mail },
      wallet: { expenses: [], currencies } };
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    const addDespesa = screen.getByRole('button', { name: /adicionar despesa/i });
    const value = screen.getByTestId('value-input');
    userEvent.type(value, '50');
    const desc = screen.getByTestId('description-input');
    userEvent.type(desc, 'test');
    userEvent.click(addDespesa);
    expect(value).not.toHaveValue(50);
    expect(desc).not.toHaveValue('test');
  });

  test('Verifica campos da tabela de despesas', () => {
    const INITIAL_STATE = { user: { email: mail },
      wallet: { expenses: [], currencies } };
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(9);
    const headerNames = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    expect(tableHeaders[0]).toHaveTextContent(headerNames[0]);
    expect(tableHeaders[1]).toHaveTextContent(headerNames[1]);
    expect(tableHeaders[2]).toHaveTextContent(headerNames[2]);
    expect(tableHeaders[3]).toHaveTextContent(headerNames[3]);
    expect(tableHeaders[4]).toHaveTextContent(headerNames[4]);
    expect(tableHeaders[5]).toHaveTextContent(headerNames[5]);
    expect(tableHeaders[6]).toHaveTextContent(headerNames[6]);
    expect(tableHeaders[7]).toHaveTextContent(headerNames[7]);
    expect(tableHeaders[8]).toHaveTextContent(headerNames[8]);
  });

  test('Verifica renderização da tabela de gastos', () => {
    const INITIAL_STATE = { user: { email: mail },
      wallet: { expenses: [{
        id: 0,
        value: '2',
        description: 'teste',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: {
          USD,
        },
      }],
      currencies } };
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    screen.getByRole('cell', {
      name: /teste/i,
    });
    screen.getByRole('cell', {
      name: /lazer/i,
    });
    screen.getByRole('cell', {
      name: /dinheiro/i,
    });
    screen.getByRole('cell', {
      name: /2\.00/i,
    });
    screen.getByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });
    screen.getByRole('cell', {
      name: /5\.00/i,
    });
    screen.getByRole('cell', {
      name: /10\.00/i,
    });
    screen.getByRole('cell', { name: 'Real' });
  });

  test('Verifica funcionamento de botão de exclusão', () => {
    const INITIAL_STATE = { user: { email: mail },
      wallet: { expenses: [{
        id: 0,
        value: '2',
        description: 'teste',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: {
          USD,
        },
      },
      {
        id: 1,
        value: '4',
        description: 'exclusao',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: {
          USD,
        },
      }],
      currencies } };
    renderWithRouterAndRedux(<Wallet />, { initialState: INITIAL_STATE });
    const deleteBtns = screen.getAllByTestId('delete-btn');
    expect(deleteBtns).toHaveLength(2);
    userEvent.click(deleteBtns[1]);
    expect(screen.getAllByTestId('delete-btn')).toHaveLength(1);
  });
});
