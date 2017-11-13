import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

describe('<NotFound>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NotFound location="/invalid/path" />);
    expect(wrapper).toMatchSnapshot();
  });
});
