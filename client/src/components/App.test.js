import React from 'react';
import { MemoryRouter, Redirect } from 'react-router';
import { shallow, mount } from 'enzyme';
import firebase from '../firebase';
import App from './App';
import Loading from './Loading';
import Login from './Login';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

jest.mock('firebaseui');

describe('<App>', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App firebase={firebase} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when page is still loading', () => {
    it('renders a <Loading> component', () => {
      const wrapper = shallow(<App firebase={firebase} />);
      expect(wrapper.find(Loading).exists()).toBe(true);
    });
  });

  describe('when page is finished loading', () => {
    beforeAll(() => {
      // use mock to fire callback with null user, loading will be set to false
      firebase.auth().onAuthStateChanged = jest.fn(cb => cb(null));
    });

    describe('and user is not authenticated', () => {
      describe('and path is /login', () => {
        it('renders a <Login> component', () => {
          const wrapper = mount(
            <MemoryRouter initialEntries={[ '/login' ]}>
              <App firebase={firebase} />
            </MemoryRouter>
          );
          expect(wrapper.find(Login).exists()).toBe(true);
        });
      });

      describe('and path is /dashboard', () => {
        it('redirects to /login', () => {
          const wrapper = mount(
            <MemoryRouter initialEntries={[ '/dashboard' ]}>
              <App firebase={firebase} />
            </MemoryRouter>
          );
          expect(wrapper.find(Login).exists()).toBe(true);
        });
      });
    });

    describe('and user is authenticated', () => {
      beforeAll(() => {
        const user = { id: 'boom' };
        // replace onAuthStateChanged w/mock that simulates user
        firebase.auth().onAuthStateChanged = jest.fn(cb => cb(user));
      });

      describe('and path is /dashboard', () => {
        it('renders a <Dashboard> component', () => {
          const wrapper = mount(
            <MemoryRouter initialEntries={[ '/dashboard' ]}>
              <App firebase={firebase} />
            </MemoryRouter>
          );
          expect(wrapper.find(Dashboard).exists()).toBe(true);
        });
      });
    });

    describe('when route path is invalid', () => {
      it('renders a <NotFound> component', () => {
        const wrapper = mount(
          <MemoryRouter initialEntries={[ '/invalid/path' ]}>
            <App firebase={firebase} />
          </MemoryRouter>
        );
        expect(wrapper.find(NotFound).exists()).toBe(true);
      });
    });
  });
});
