import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { wait } from '@testing-library/user-event/dist/utils';

test('I am your test', async() => {
  render(<App />);
  // const carregando = screen.getByText('Carregando')
  // expect(carregando).toBeInTheDocument()
  // await waitForElementToBeRemoved(()=> screen.getByText('Carregando'))
  // expect(carregando).not.toBeInTheDocument()
 const test = screen.getByRole('textbox')
 expect(test).toBeInTheDocument()
});
