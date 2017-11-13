import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';
import firebase from '../firebase';

describe('<Login>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Login firebase={firebase} />);
    expect(wrapper).toMatchSnapshot();
  });
});
