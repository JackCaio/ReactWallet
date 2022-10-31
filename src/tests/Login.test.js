import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Verifica página de Login', () => {
  test('Rota inicial deve ser `/`', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });
  test('Devem haver campos para login e senha', () => {
    const INITIAL_STATE = { user: { email: '' } };
    renderWithRouterAndRedux(<App />, { initialState: INITIAL_STATE });
    const login = screen.getByRole('textbox', { name: /mail/i });
    const password = screen.getByLabelText(/pass/i);
    expect(login).toHaveClass('invalid');
    expect(password).toHaveClass('invalid');
    userEvent.type(login, 'teste@teste.com');
    expect(login).toHaveClass('valid');
    userEvent.type(password, '123456');
    expect(password).toHaveClass('valid');
  });
  test('O botão de login redireciona para `/carteira`', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const loginBtn = screen.getByRole('button', { name: /entrar/i });
    expect(loginBtn).toBeDisabled();
    const login = screen.getByRole('textbox', { name: /mail/i });
    userEvent.type(login, 'login@test.com');
    const password = screen.getByLabelText(/pass/i);
    userEvent.type(password, 'abcdef');
    expect(loginBtn).not.toBeDisabled();
    userEvent.click(loginBtn);
    expect(history.location.pathname).toBe('/carteira');
  });
});
