import React from 'react';
import Enzyme,{ shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Login from "../pages/Login";
import configureStore from '../store/configureStore'
import App from "../App";
import {Provider} from "react-redux";

Enzyme.configure({ adapter: new Adapter() })
const store = configureStore();

describe('Login', () => {
  // make our assertion and what we expect to happen
  it('should render without throwing an error', () => {
    expect(shallow(<Provider store={store}>
      <Login />
    </Provider>).find('div.connexion').exists()).toBe(true)
  })
});

describe('Login input onchange', () => {

  it('should respond to change event and change the state of the Login Component', () => {

    const wrapper = shallow(<Login />);
    wrapper.find('#username').simulate('change', {target: {value: 'blah@gmail.com'}});

    expect(wrapper.state('user')).toEqual({"username": "blah@gmail.com"});
  })

  it('should respond to change event and change the state of the Login Component', () => {

    const wrapper = shallow(<Login />);
    wrapper.find('#password').simulate('change', {target: {value: 'test'}});

    expect(wrapper.state('user')).toEqual({"password": "test"});
  })
});
