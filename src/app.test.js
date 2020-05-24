import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

test('App renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('App renders welcome message', () => {
  const app = renderer.create(<App />);
  const tree = app.toJSON();
  expect(tree).toMatchSnapshot();
});
