import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App';
import { wait } from '@testing-library/user-event/dist/utils';
import GlobalContext from '../context/GlobalContext';
import Table from '../Components/Table';
import { Planets } from '../Types';
import userEvent from '@testing-library/user-event';


const apiResults:Planets [] = [
  {
    "name": "Tatooine", 
    "rotation_period": "23", 
    "orbital_period": "304", 
    "diameter": "10465", 
    "climate": "arid", 
    "gravity": "1 standard", 
    "terrain": "desert", 
    "surface_water": "1", 
    "population": "200000", 
    "residents": [
        "https://swapi.dev/api/people/1/", 
        "https://swapi.dev/api/people/2/", 
        "https://swapi.dev/api/people/4/", 
        "https://swapi.dev/api/people/6/", 
        "https://swapi.dev/api/people/7/", 
        "https://swapi.dev/api/people/8/", 
        "https://swapi.dev/api/people/9/", 
        "https://swapi.dev/api/people/11/", 
        "https://swapi.dev/api/people/43/", 
        "https://swapi.dev/api/people/62/"
    ], 
    "films": [
        "https://swapi.dev/api/films/1/", 
        "https://swapi.dev/api/films/3/", 
        "https://swapi.dev/api/films/4/", 
        "https://swapi.dev/api/films/5/", 
        "https://swapi.dev/api/films/6/"
    ], 
    "created": "2014-12-09T13:50:49.641000Z", 
    "edited": "2014-12-20T20:58:18.411000Z", 
    "url": "https://swapi.dev/api/planets/1/"
  }
]
const filterResultsByText = () =>{}
const filterResultsByValue = () =>{}



test('I am your test' , () => {
  const loading = true
  render(<GlobalContext.Provider value = {{apiResults, filterResultsByText , filterResultsByValue, loading} }>
    <Table />
  </GlobalContext.Provider>
    );
  const carregando = screen.getByText('loading')
  expect(carregando).toBeInTheDocument()
});

test('Teste geral', () => {
  const loading = false
  render(<GlobalContext.Provider value = {{apiResults, filterResultsByText , filterResultsByValue, loading} }>
    <Table />
  </GlobalContext.Provider>
    );
    
 const test = screen.getByRole('textbox')
 expect(test).toBeInTheDocument()
 const search = screen.getByTestId('name-filter');
 expect(search).toBeInTheDocument();
 const filter = screen.getByRole('button', { name: /filter/i });
 expect(filter).toBeInTheDocument();
 const namePlant = screen.getByText('Tatooine')
 expect(namePlant).toBeInTheDocument();
 const terrain = screen.getByText('desert')
 expect(terrain).toBeInTheDocument();
} )

test.only('Verifica os campos existem', () => {
  render(<App />);
  const search = screen.getByTestId('name-filter');
  const inpNumber = screen.getByTestId('value-filter')
  const buttonFilter = screen.getByRole('button', { name: /filter/i });

  expect(search).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();

  userEvent.type(inpNumber, '200000');
  userEvent.click(buttonFilter);
  // const filter = screen.getByTestId('filter');

  // expect(filter).toHaveTextContent('population')
  // expect(filter).toHaveTextContent('maior que')
  // expect(filter).toHaveTextContent('200000')
  
});
