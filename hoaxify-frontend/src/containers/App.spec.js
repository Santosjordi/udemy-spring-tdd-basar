import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import App from './App';

const setup = (path) => {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <App/>
        </MemoryRouter>
    );
};

describe('App', () => {
    it('displays homepage when url is /', () => {
        const {queryByTestId} = setup('/');
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });
    it('displays login page when url is /login', () => {
        const {container} = setup('/login');
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Login');
    });
    it('displays only login LoginPage when url is /login', () => {
        const {queryByTestId} = setup('/login');
        expect(queryByTestId('homepage')).not.toBeInTheDocument();
    });
    it('displays SignupPage when url is /signup', () => {
        const {container} = setup('/signup');
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Sign Up');
    });
    it('displays userpage when url is other than /, /login or /signup', () => {
        const {queryByTestId} = setup('/user1');
        expect(queryByTestId('userpage')).toBeInTheDocument();
    });
    it('displays TopBar when url is /', () => {
        const {container} = setup('/');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });
    it('displays TopBar when url is /login', () => {
        const {container} = setup('/login');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });
    it('displays TopBar when url is /signup', () => {
        const {container} = setup('/signup');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });
    it('displays TopBar when url is /user1', () => {
        const {container} = setup('/user1');
        const navigation = container.querySelector('nav');
        expect(navigation).toBeInTheDocument();
    });
    it('shows the userSignupPage when clicking signup', () => {
        const {queryByText, container} = setup('/');
        const signUpLink = queryByText('Sign Up');
        fireEvent.click(signUpLink);
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Sign Up');
    });
    it('shows the LoginPage when clicking login', () => {
        const {queryByText, container} = setup('/');
        const loginLink = queryByText('Login');
        fireEvent.click(loginLink);
        const header = container.querySelector('h1');
        expect(header).toHaveTextContent('Login');
    });
    it('shows the HomePage when clicking the logo', () => {
        const {queryByTestId, container} = setup('/login');
        const logo = container.querySelector('img');
        fireEvent.click(logo);
        expect(queryByTestId('homepage')).toBeInTheDocument();
    });
});
