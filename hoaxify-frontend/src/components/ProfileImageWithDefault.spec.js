import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileImageWithDefault from './ProfileImageWithDefault'

describe('ProfileImageWithDefault', () => {
    describe('layout', () => {
        it('has image', () => {
            const { container } = render(<ProfileImageWithDefault />);
            const image  = container.querySelector('img');
            expect(image).toBeInTheDocument();
        });
        it('displays default image when image source is not provided', () => {
            const { container } = render(<ProfileImageWithDefault />);
            const image  = container.querySelector('img');
            expect(image.src).toContain('/profile.png');
        });
        it('displays user image when image source is provided', () => {
            const { container } = render(<ProfileImageWithDefault image='profile1.png'/>);
            const image  = container.querySelector('img');
            expect(image.src).toContain('/images/profile/profile1.png');
        });
        it('displays default image when provided image source fails to load', () => {
            const { container } = render(<ProfileImageWithDefault image='profile1.png'/>);
            const image  = container.querySelector('img');
            fireEvent.error(image);
            expect(image.src).toContain('profile.png');
        });
        it('displays the image provided throught src property', () => {
            const { container } = render(<ProfileImageWithDefault src="image-from-src.png"/>);
            const image  = container.querySelector('img');
            expect(image.src).toContain('/image-from-src.png');
        });
    });
});