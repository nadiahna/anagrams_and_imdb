import { render, screen } from '@testing-library/react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import Link from 'react-router-dom';
import App from './App';

// jest.mock('../pages', () => ({ Login: 'login' }));
describe('App', () => {
  test('renders learn react link', () => {
    const component = renderer.create(
      <Link to="/">Home</Link>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    // render(<App />);
    // const wrapper = shallow(<App />);
    // expect(wrapper.find('div')).toHaveLength(1);
  });
});

