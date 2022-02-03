import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitForElement,
} from '@testing-library/react';
import { LoginPage } from './LoginPage';

describe('login page', () => {
    describe('layout', ()=> {
        it('has header of login', ()=> {
            const { container } = render(<LoginPage/>);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Login');
        });
        it('has input for username', () =>{
            const { queryByPlaceholderText } = render(<LoginPage/>);
            const usernameInput = queryByPlaceholderText('Your username');
            expect(usernameInput).toBeInTheDocument();
        });
        it('has input for password', () =>{
            const { queryByPlaceholderText } = render(<LoginPage/>);
            const usernameInput = queryByPlaceholderText('Your password');
            expect(usernameInput).toBeInTheDocument();
        });
        it('has password type for password', () =>{
            const { queryByPlaceholderText } = render(<LoginPage/>);
            const usernameInput = queryByPlaceholderText('Your password');
            expect(usernameInput.type).toBe('password');
        });
        it('has login button', ()=> {
            const { container } = render(<LoginPage/>);
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

        let usernameInput, passwordInput, button;

        const setupForSubmit = (props) => {
            const rendered = render(<LoginPage {...props}/>);

            const { container, queryByPlaceholderText} = rendered;

            usernameInput = queryByPlaceholderText('Your username');
            fireEvent.change(usernameInput, changeEvent('my-user-name'));
            passwordInput = queryByPlaceholderText('Your password');
            fireEvent.change(passwordInput, changeEvent('P4ssword'));
            button = container.querySelector('button');
            return rendered;
        }

        it('sets the username value into state', ()=> {
            const { queryByPlaceholderText } = render(<LoginPage/>);
            const usernameInput = queryByPlaceholderText('Your username');
            fireEvent.change(usernameInput, changeEvent('my-user-name'));
            expect(usernameInput).toHaveValue('my-user-name');
        });
        it('sets the password value into state', ()=> {
            const { queryByPlaceholderText } = render(<LoginPage/>);
            const passwordInput = queryByPlaceholderText('Your password');
            fireEvent.change(passwordInput, changeEvent('P4ssword'));
            expect(passwordInput).toHaveValue('P4ssword');
        });
        it('calls postLogin when actions are provided in props and input fields have value', () =>{
            const actions = {
                postLogin: jest.fn().mockResolvedValue({})
            };

            setupForSubmit({actions});
            fireEvent.click(button);
            expect(actions.postLogin).toHaveBeenCalledTimes(1);
        });
        it('does not throw an exception when clicking the button when actions are not provided in props', () =>{
            setupForSubmit();
            expect(() => {fireEvent.click(button)}).not.toThrow();
        });
        it('calls postLogin with credential in body', () =>{
            const actions = {
                postLogin: jest.fn().mockResolvedValue({})
            };

            setupForSubmit({actions});
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
    });
})