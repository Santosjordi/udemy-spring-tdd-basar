import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  waitForDomChange
} from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('login page', () => {
  describe('layout', () => {
    it('has header of login', () => {
      const { container } = render(<LoginPage />);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Login');
    });
    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const usernameInput = queryByPlaceholderText('Your username');
      expect(usernameInput).toBeInTheDocument();
    });
    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const usernameInput = queryByPlaceholderText('Your password');
      expect(usernameInput).toBeInTheDocument();
    });
    it('has password type for password', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const usernameInput = queryByPlaceholderText('Your password');
      expect(usernameInput.type).toBe('password');
    });
    it('has login button', () => {
      const { container } = render(<LoginPage />);
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
    });
  });
  describe('interactions', () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content
        }
      };
    };

    const mockAsyncDelayed = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300)
        })
      })
    }

    let usernameInput, passwordInput, button;

    const setupForSubmit = (props) => {
      const rendered = render(<LoginPage {...props} />);

      const { container, queryByPlaceholderText } = rendered;

      usernameInput = queryByPlaceholderText('Your username');
      fireEvent.change(usernameInput, changeEvent('my-user-name'));
      passwordInput = queryByPlaceholderText('Your password');
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      button = container.querySelector('button');
      return rendered;
    }

    it('sets the username value into state', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const usernameInput = queryByPlaceholderText('Your username');
      fireEvent.change(usernameInput, changeEvent('my-user-name'));
      expect(usernameInput).toHaveValue('my-user-name');
    });
    it('sets the password value into state', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const passwordInput = queryByPlaceholderText('Your password');
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      expect(passwordInput).toHaveValue('P4ssword');
    });
    it('calls postLogin when actions are provided in props and input fields have value', () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({})
      };

      setupForSubmit({ actions });
      fireEvent.click(button);
      expect(actions.postLogin).toHaveBeenCalledTimes(1);
    });
    it('does not throw an exception when clicking the button when actions are not provided in props', () => {
      setupForSubmit();
      expect(() => { fireEvent.click(button) }).not.toThrow();
    });
    it('calls postLogin with credential in body', () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({})
      };

      setupForSubmit({ actions });
      fireEvent.click(button);

      const expectedUserObject = {
        username: 'my-user-name',
        password: 'P4ssword'
      }
      expect(actions.postLogin).toHaveBeenCalledWith(expectedUserObject);
    });
    it('enables the button when username and password is not empty', () => {
      setupForSubmit();
      expect(button).not.toBeDisabled();
    });
    it('disables the button when username is empty', () => {
      setupForSubmit();
      fireEvent.change(usernameInput, changeEvent(''));
      expect(button).toBeDisabled();
    });
    it('displays alert when login fails', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed',
            },
          },
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const alert = await waitForElement(() => queryByText('Login failed'));
      expect(alert).toBeInTheDocument();
    });
    it('clears alert when user changes username', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed',
            },
          },
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitForElement(() => queryByText('Login failed'));
      fireEvent.change(usernameInput, changeEvent('updated-username'));

      const alert = queryByText('Login failed');
      expect(alert).not.toBeInTheDocument();
    });
    it('clears alert when user changes password', async () => {
      const actions = {
        postLogin: jest.fn().mockRejectedValue({
          response: {
            data: {
              message: 'Login failed',
            },
          },
        }),
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitForElement(() => queryByText('Login failed'));
      fireEvent.change(passwordInput, changeEvent('updated-password'));

      const alert = queryByText('Login failed');
      expect(alert).not.toBeInTheDocument();
    });
    it('does not allow the user to click the login button when there is an ongoing api call', () => {
      const actions = {
        postLogin: mockAsyncDelayed()
      };
      setupForSubmit({ actions });
      fireEvent.click(button);

      fireEvent.click(button);
      expect(actions.postLogin).toHaveBeenCalledTimes(1);
    });
    it('displays a spinner when there is an ongoing api call', () => {
      const actions = {
        postLogin: mockAsyncDelayed()
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      const spinner = queryByText('Loading...'); //look for bootstrap spinner component
      expect(spinner).toBeInTheDocument();
    });
    it('hides spinner ongoing api call finishes successfully', async () => {
      const actions = {
        postLogin: mockAsyncDelayed()
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitForDomChange();

      const spinner = queryByText('Loading...'); //look for bootstrap spinner component
      expect(spinner).not.toBeInTheDocument();
    });
    it('hides spinner ongoing api call finishes with error', async () => {
      const actions = {
        postLogin: jest.fn().mockImplementation(() => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              reject({
                response: { data: {} }
              });
            }, 300);
          });
        })
      };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);

      await waitForDomChange();

      const spinner = queryByText('Loading...'); //look for bootstrap spinner component
      expect(spinner).not.toBeInTheDocument();
    });
    it('redirects to homepage after sucessfull login', async () => {
      const actions = {
        postLogin: jest.fn().mockResolvedValue({})
      };

      const history = {
        push: jest.fn()
      }
      setupForSubmit({ actions, history });
      fireEvent.click(button);

      await waitForDomChange();

      expect(history.push).toHaveBeenCalledWith('/');
    });
  });
});

console.error = () => { };