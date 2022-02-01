import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
                postLogin: jest.fn().mockResolvedValue({});
            }
        });
    });
})