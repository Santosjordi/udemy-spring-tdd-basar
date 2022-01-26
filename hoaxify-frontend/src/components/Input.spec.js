import React from "react";
import {
    cleanup,
    render,
    fireEvent
} from "@testing-library/react";
import Input from './Input';
import '@testing-library/jest-dom/extend-expect';

describe('Layout', () => {
    it('has input item', ()=> {
        const { container } = render(<Input />);
        const input = container.querySelector('input');
        expect(input).toBeInTheDocument();
    });
    it('displays the label provided in props', () => {
        const { queryByText } = render(<Input label="Test label"/>);
        const label = queryByText('Test label');
        expect(label).toBeInTheDocument();
    });
    it('does not displays the label when no label is provided in props', () => {
        const { container } = render(<Input />);
        const label = container.querySelector('label');
        expect(label).not.toBeInTheDocument();
    });
    it('has type for input when type is not provided in props', () => {
        const { container } = render(<Input />);
        const input = container.querySelector('input');
        expect(input.type).toBe('text');
    });
    it('has password type for input password type is provided as prop', () => {
        const { container } = render(<Input type="password"/>);
        const input = container.querySelector('input');
        expect(input.type).toBe('password');
    });
    it('displays placeholder when it is provided as prop', () => {
        const { container } = render(<Input placeholder="Test placeholder"/>);
        const input = container.querySelector('input');
        expect(input.placeholder).toBe('Test placeholder');
    });
    it('has value for input when it is provided as prop', () => {
        const { container } = render(<Input value="Test value"/>);
        const input = container.querySelector('input');
        expect(input.value).toBe('Test value');
    });
    it('has onChange callBack when it is provided as prop', () => {
        const onChange = jest.fn();

        const { container } = render(<Input onChange={onChange}/>);
        const input = container.querySelector('input');
        fireEvent.change(input, {target:{value: 'new-input'}});
        expect(onChange).toHaveBeenCalledTimes(1);
    });
    it('default style for when there was no failure or success', () => {
        const { container } = render(<Input />);
        const input = container.querySelector('input');
         expect(input.className).toBe('form-control');
    });
    it('has success style for when hasError property is false', () => {
        const { container } = render(<Input hasError={false}/>);
        const input = container.querySelector('input');
         expect(input.className).toBe('form-control is-valid');
    });
    it('has success style for when hasError property is true', () => {
        const { container } = render(<Input hasError={true}/>);
        const input = container.querySelector('input');
         expect(input.className).toBe('form-control is-invalid');
    });
    it('displays error message when provided', () => {
        const { queryByText } = render(<Input hasError={true} error="Cannot be null"/>);
         expect(queryByText('Cannot be null')).toBeInTheDocument();
    });
    it('does not displays error message when the message is not provided', () => {
        const { queryByText } = render(<Input error="Cannot be null"/>);
         expect(queryByText('Cannot be null')).not.toBeInTheDocument();
    });
})