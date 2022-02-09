import React from "react";
import {
    cleanup,
    render,
    fireEvent,
    waitForDomChange,
    waitForElement
} from "@testing-library/react";

import { UserSignupPage } from './UserSignupPage';

beforeEach(cleanup);

describe('UserSignupPage', () => {
    describe('layout', () => {
        it('has header of sign up', () => {
            const { container } = render(<UserSignupPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Sign Up');
        });
        it('has input for displayName', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your display name');
            expect(displayNameInput).toBeInTheDocument();
        });
        it('has input for username', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');
            expect(usernameInput).toBeInTheDocument();
        });
        it('has input for password', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has password type for password input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            expect(passwordInput.type).toBe('password');
        });
        it('has input for password repeat', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Repeat your password');
            expect(passwordInput).toBeInTheDocument();
        });
        it('has password type for password repeat input', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Repeat your password');
            expect(passwordInput.type).toBe('password');
        });
        it('has submit button', () => {
            const { container } = render(<UserSignupPage />);
            const button = container.querySelector('button');
            expect(button).toBeInTheDocument();
        });
    });
    describe('Interactions', () => {
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

        let button, displayNameInput, usernameInput, passwordInput, passwordRepeat;

        const setupForSubmit = (props) => {
            const rendered = render(
                <UserSignupPage {...props} />
            );

            const { container, queryByPlaceholderText } = rendered;

            displayNameInput = queryByPlaceholderText('Your display name');
            usernameInput = queryByPlaceholderText('Your username');
            passwordInput = queryByPlaceholderText('Your password');
            passwordRepeat = queryByPlaceholderText('Repeat your password');

            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            fireEvent.change(usernameInput, changeEvent('my-user-name'));
            fireEvent.change(passwordInput, changeEvent('P4ssword'));
            fireEvent.change(passwordRepeat, changeEvent('P4ssword'));

            button = container.querySelector('button');
            return rendered;
        }

        it('sets the displayName value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const displayNameInput = queryByPlaceholderText('Your display name');
            fireEvent.change(displayNameInput, changeEvent('my-display-name'));
            expect(displayNameInput).toHaveValue('my-display-name');
        });
        it('sets the username value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const usernameInput = queryByPlaceholderText('Your username');
            fireEvent.change(usernameInput, changeEvent('my-user-name'));
            expect(usernameInput).toHaveValue('my-user-name');
        });
        it('sets the password value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordInput = queryByPlaceholderText('Your password');
            fireEvent.change(passwordInput, changeEvent('P4ssword'));
            expect(passwordInput).toHaveValue('P4ssword');
        });
        it('sets the password repeat value into state', () => {
            const { queryByPlaceholderText } = render(<UserSignupPage />);
            const passwordRepeat = queryByPlaceholderText('Repeat your password');
            fireEvent.change(passwordRepeat, changeEvent('P4ssword'));
            expect(passwordRepeat).toHaveValue('P4ssword');
        });
        it('calls the signup when the fields are valid and the actions are provided on props', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            };
            setupForSubmit({ actions });
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });
        it('does not throw exception when clicking the button while not providing action in the props', () => {
            setupForSubmit();
            expect(() => fireEvent.click(button)).not.toThrow();
        });
        it('calls post with user body when fields are valid', () => {
            const actions = {
                postSignup: jest.fn().mockResolvedValueOnce({})
            };
            setupForSubmit({ actions });
            fireEvent.click(button);
            const expectedUserObject = {
                username: 'my-user-name',
                displayName: 'my-display-name',
                password: 'P4ssword'
            }
            expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
        });
        it('does not allow the user to click the signup button when there is an ongoing api call', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            setupForSubmit({ actions });
            fireEvent.click(button);
            fireEvent.click(button);
            expect(actions.postSignup).toHaveBeenCalledTimes(1);
        });
        it('displays a spinner when there is an ongoing api call', () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            const spinner = queryByText('Loading...'); //look for bootstrap spinner component
            expect(spinner).toBeInTheDocument();
        });
        it('hides spinner ongoing api call finishes successfully', async () => {
            const actions = {
                postSignup: mockAsyncDelayed()
            };
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            await waitForDomChange();

            const spinner = queryByText('Loading...'); //look for bootstrap spinner component
            expect(spinner).not.toBeInTheDocument();
        });
        it('hides spinner ongoing api call finishes with error', async () => {
            const actions = {
                postSignup: jest.fn().mockImplementation(() => {
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
        it('displays validation error for displayName when error is received for the field', async () => {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            validationErrors: {
                                displayName: 'Cannot be null',
                            }
                        }
                    }
                })
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);
            const errorMessage = await waitForElement(() => queryByText('Cannot be null'));
            expect(errorMessage).toBeInTheDocument();
        });
        it('enables signup button when password and password repeat have the same value', () => {
            setupForSubmit();
            expect(button).not.toBeDisabled();
        });
        it('disables signup button when password repeat does not match password', () => {
            setupForSubmit();
            fireEvent.change(passwordRepeat, changeEvent('new-pass'));
            expect(button).toBeDisabled();
        });
        it('disables signup button when password does not match password repeat', () => {
            setupForSubmit();
            fireEvent.change(passwordInput, changeEvent('new-pass'));
            expect(button).toBeDisabled();
        });
        it('displays error style for password repeat input when password repeat mismatch', () => {
            const { queryByText } = setupForSubmit();
            fireEvent.change(passwordRepeat, changeEvent('new-pass'));
            const mismatchWarning = queryByText('Does not match to password');
            expect(mismatchWarning).toBeInTheDocument();
        });
        it('displays error style for password repeat input when password input mismatch', () => {
            const { queryByText } = setupForSubmit();
            fireEvent.change(passwordInput, changeEvent('new-pass'));
            const mismatchWarning = queryByText('Does not match to password');
            expect(mismatchWarning).toBeInTheDocument();
        });
        it('hides validation error when user changes content for displayName', async () => {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            validationErrors: {
                                displayName: 'Cannot be null',
                            }
                        }
                    }
                })
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);
            await waitForElement(() => queryByText('Cannot be null'));
            fireEvent.change(displayNameInput, changeEvent('name updated'));

            const errorMessage = queryByText('Cannot be null');
            expect(errorMessage).not.toBeInTheDocument();
        });
        it('hides validation error when user changes content of username', async () => {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            validationErrors: {
                                username: 'Username cannot be null',
                            }
                        }
                    }
                })
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            await waitForElement(() => queryByText('Username cannot be null'));
            fireEvent.change(usernameInput, changeEvent('name updated'));

            const errorMessage = queryByText('Username cannot be null');
            expect(errorMessage).not.toBeInTheDocument();
        });
        it('hides validation error when user changes content of password', async () => {
            const actions = {
                postSignup: jest.fn().mockRejectedValue({
                    response: {
                        data: {
                            validationErrors: {
                                password: 'Cannot be null',
                            }
                        }
                    }
                })
            }
            const { queryByText } = setupForSubmit({ actions });
            fireEvent.click(button);

            await waitForElement(() => queryByText('Cannot be null'));
            fireEvent.change(passwordInput, changeEvent('updated-password'));

            const errorMessage = queryByText('Cannot be null');
            expect(errorMessage).not.toBeInTheDocument();
        });
        it('redirects to homepage after sucessfull signup', async () => {
            const actions = {
              postSignup: jest.fn().mockResolvedValue({})
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