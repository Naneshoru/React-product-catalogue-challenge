// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from './mocks/server';

console.log('MSW server setup...');
 
beforeAll(() => {
  console.log('Starting MSW server...');
  server.listen();
});

afterEach(() => {
  console.log('Resetting MSW handlers...');
  server.resetHandlers();
});

afterAll(() => {
  console.log('Stopping MSW server...');
  server.close();
});
