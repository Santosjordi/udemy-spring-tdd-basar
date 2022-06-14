import React from "react";
import { render } from "@testing-library/react";
import ProfileCard from '../components/ProfileCard';

const user = {
    id: 1,
    username: 'user1',
    displayName: 'display1',
    image: 'profile1.png'
}

describe('ProfileCard', () => {
    describe('layout', () => {
        it('displays the displayName@username', () => {
            const { queryByText } = render(<ProfileCard user={user}/>);
            const userInfo = queryByText('display1@user1');
            expect(userInfo).toBeInTheDocument();
        });
        it('has image', () => {
            const { container } = render(<ProfileCard user={user}/>);
            const image = container.querySelector('img');
            expect(image).toBeInTheDocument();
        });
        it('displays default image when user has none', () => {
            const userWIthoutImage = {
                ...user,
                image: undefined
            }
            const { container } = render(<ProfileCard user={userWIthoutImage}/>);
            const image = container.querySelector('img');
            expect(image.src).toContain('/profile.png');
        });
        it('displays user image when user has one', () => {
            const { container } = render(<ProfileCard user={user}/>);
            const image = container.querySelector('img');
            expect(image.src).toContain('/images/profile/' + user.image);
        });
        it('displays edit button when isEditable property is set to true', () => {
            const { queryByText } = render(
                <ProfileCard user={user} isEditable={true}/>
                );
            const editButton = queryByText('Edit');
            expect(editButton).toBeInTheDocument();
        });
        it('does not display edit button when isEditable property is not provided', () => {
            const { queryByText } = render(<ProfileCard user={user}/>);
            const editButton = queryByText('Edit');
            expect(editButton).not.toBeInTheDocument();
        });
    })
})