import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import Login from '../components/Login';



describe('<Login /> with no props', () => {
    const dispatch = jest.fn()
    const container = shallow(<Login />);
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });

  it('should have an email field', () => {
    expect(container.find('input[type="email"]').length).toEqual(1);
  });

  it('should have proper props for email field', () => {
    expect(container.find('input[type="email"]').props()).toEqual({
        label: 'email',
        name: 'email',
        type: 'email',
        id: 'email',
        value: expect.any(Function),
        onChange: expect.any(Function),
        fullWidth,
        margin: 'normal',
        required ,
    });
  });

  it('should have a password field', () => { /* Similar to above */ });
  it('should have proper props for password field', () => { /* Trimmed for less lines to read */ });
  it('should have a submit button', () => { /* */ });
  it('should have proper props for submit button', () => { /* */ });
});