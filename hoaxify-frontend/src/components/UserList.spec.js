import React from "react";
import { fireEvent, render, waitForDomChange, waitForElement } from '@testing-library/react';
import UserList from './UserList';
import * as apiCalls from '../api/apiCalls';

apiCalls.listUsers = jest.fn().mockResolvedValue({
    data: {
        content: [],
        number: 0,
        size: 3
    }
});

const setup = () => {
    return render(<UserList />);
};

const mockedEmptySuccessResponse = {
    data: {
        content: [],
        number: 0,
        size: 3
    }
};

const mockSuccessGetSinglePage = {
    data: {
        content: [
            {
                username: 'user1',
                displayName: 'display1',
                image: ''
            },
            {
                username: 'user2',
                displayName: 'display2',
                image: ''
            },
            {
                username: 'user3',
                displayName: 'display3',
                image: ''
            }
        ],
        number: 0,
        first: true,
        last: true,
        size: 3,
        totalPages: 1
    }
}

const mockSuccessGetMultiPageFirst = {
    data: {
        content: [
            {
                username: 'user1',
                displayName: 'display1',
                image: ''
            },
            {
                username: 'user2',
                displayName: 'display2',
                image: ''
            },
            {
                username: 'user3',
                displayName: 'display3',
                image: ''
            }
        ],
        number: 0,
        first: true,
        last: false,
        size: 3,
        totalPages: 2
    }
}

const mockSuccessGetMultiPageLast = {
    data: {
        content: [
            {
                username: 'user4',
                displayName: 'display4',
                image: ''
            }
        ],
        number: 1,
        first: false,
        last: true,
        size: 3,
        totalPages: 2
    }
}

const mockFailGet = {
    response: {
        data: {
            message: 'Load error'
        }
    }
}

describe('UserList', () => {
    describe('layout', () => {
        it('has header of users', () => {
            const { container } = setup();
            const header = container.querySelector('h3');
            expect(header).toHaveTextContent('Users');
        });
        it('display three items when listUser api returns three users', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValue(mockSuccessGetSinglePage);
            const { queryByTestId } = setup();
            await waitForDomChange();
            const userGroup = queryByTestId('userGroup');
            expect(userGroup.childElementCount).toBe(3);
        });
        it('displays the displayName@username when listUser api returns users', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValue(mockSuccessGetSinglePage);
            const { queryByText } = setup();
            const firstUser = await waitForElement(() =>
                queryByText('display1@user1')
            );
            expect(firstUser).toBeInTheDocument();
        });
        it('displays next button when response has last value as false', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValue(mockSuccessGetMultiPageFirst);
            const { queryByText } = setup();
            const nextLink = await waitForElement(() =>
                queryByText('next >')
            );
            expect(nextLink).toBeInTheDocument();
        });
        it('hides next button when response has last value as true', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValue(mockSuccessGetMultiPageLast);
            const { queryByText } = setup();
            const nextLink = await waitForElement(() =>
                queryByText('next >')
            );
            expect(nextLink).not.toBeInTheDocument();
        });
        it('displays previous button when response has first value as false', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValue(mockSuccessGetMultiPageLast);
            const { queryByText } = setup();
            const previousLink = await waitForElement(() =>
                queryByText('< previous')
            );
            expect(previousLink).toBeInTheDocument();
        });
        it('hides the previous button when response has first value as true', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValue(mockSuccessGetMultiPageFirst);
            const { queryByText } = setup();
            const previousLink = await waitForElement(() =>
                queryByText('< previous')
            );
            expect(previousLink).not.toBeInTheDocument();
        });
    });
    describe('Lifecycle', () => {
        it('calls listUsers api when it is redered', () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValue(mockedEmptySuccessResponse);
            setup();
            expect(apiCalls.listUsers).toHaveBeenCalledTimes(1);
        });
        it('calls listUsers method with page zero and size three', () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValue(mockedEmptySuccessResponse);
            setup();
            expect(apiCalls.listUsers).toHaveBeenCalledWith({ page: 0, size: 3 });
        });
    });
    describe('interactions', () => {
        it('loads next page when users clicks the next button', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValueOnce(mockSuccessGetMultiPageFirst)
                .mockResolvedValueOnce(mockSuccessGetMultiPageLast);
            const { queryByText } = setup();
            const nextLink = await waitForElement(() => queryByText('next >'));
            fireEvent.click(nextLink);
            const secondPageUser = await waitForElement( () => queryByText('display4@user4'))
            expect(secondPageUser).toBeInTheDocument();
        });
        it('loads previous page when users clicks the previous button', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValueOnce(mockSuccessGetMultiPageLast)
                .mockResolvedValueOnce(mockSuccessGetMultiPageFirst);
            const { queryByText } = setup();
            const previousLink = await waitForElement(() => queryByText('< previous'));
            fireEvent.click(previousLink);

            const firstPageUser = await waitForElement( () => queryByText('display1@user1'))
            expect(firstPageUser).toBeInTheDocument();
        });
        it('displays error message when loading other page fails', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValueOnce(mockSuccessGetMultiPageLast)
                .mockRejectedValueOnce(mockFailGet);
            const { queryByText } = setup();
            const previousLink = await waitForElement(() => queryByText('< previous'));
            fireEvent.click(previousLink);

            const errorMessage = await waitForElement( () => queryByText('User load failed'))
            expect(errorMessage).toBeInTheDocument();
        });
        //solved by declaring loadError as undefined in state
        it('hides error message when successfully loads another page', async () => {
            apiCalls.listUsers = jest
                .fn()
                .mockResolvedValueOnce(mockSuccessGetMultiPageLast)
                .mockRejectedValueOnce(mockFailGet)
                .mockResolvedValueOnce(mockSuccessGetMultiPageFirst);
            const { queryByText } = setup();
            const previousLink = await waitForElement(() => queryByText('< previous'));
            fireEvent.click(previousLink);
            await waitForElement( () => queryByText('User load failed'));
            fireEvent.click(previousLink);
            const errorMessage = await waitForElement( () => queryByText('User load failed'));
            expect(errorMessage).not.toBeInTheDocument();
        });
    })
});

console.error = () => { };