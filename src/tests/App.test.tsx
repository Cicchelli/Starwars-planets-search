import { render, screen, waitForElementToBeRemoved, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import GlobalContext from '../context/GlobalContext';
import Table from '../Components/Table';
import { Planets } from '../Types';
import userEvent from '@testing-library/user-event';
import Forms from '../Components/Forms';
import {vi} from 'vitest'
import * as ApiModule from '../utils/FetchApi'
import mockData from './Mocks/mockData.';


beforeEach(()=>{
vi.spyOn(ApiModule, 'fetchApi').mockResolvedValue(mockData.results);
})

afterEach(()=>{
vi.clearAllMocks();
})

 test('teste novo', async() =>{
  render(<App />)

  await waitFor(()=>{
    
    screen.getByRole('cell', {name: 'Tatooine'})
  },{timeout: 10000})

  screen.debug()
 }
  )


// test('Teste geral', () => {
//   const loading = false
//   render(
//     <App />
  
//     );
    
//  const test = screen.getByRole('textbox')
//  expect(test).toBeInTheDocument()
//  const search = screen.getByTestId('name-filter');
//  expect(search).toBeInTheDocument();
//  const filter = screen.getByRole('button', { name: /filter/i });
//  expect(filter).toBeInTheDocument();
// //  const namePlant = screen.getByText('Tatooine')
// //  expect(namePlant).toBeInTheDocument();
//  const terrain = screen.getByText('desert')
//  expect(terrain).toBeInTheDocument();
// } )

test('Verifica os campos existem', () => {
  render(<App />);
  const search = screen.getByTestId('name-filter');
  const inpNumber = screen.getByTestId('value-filter')
  const buttonFilter = screen.getByRole('button', { name: /filter/i });
  

  expect(search).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();

  userEvent.type(inpNumber, '200000');
  userEvent.click(buttonFilter);
  
});

// // ...

test('Teste de filtro por nome', () => {
  const loading = false;
  render(
    
      <App />
    
  );

  const search = screen.getByTestId('name-filter');
  const filterButton = screen.getByRole('button', { name: /filter/i });

  userEvent.type(search, 'Tatooine');
  userEvent.click(filterButton);

  // const planetName = screen.getByText('Tatooine');
  // expect(planetName).toBeInTheDocument();

  // Verifique se os outros planetas não estão visíveis
  const otherPlanetName = screen.queryByText('Alderaan');
  expect(otherPlanetName).not.toBeInTheDocument();
});

test('Teste de filtro por valor', () => {
  const loading = false;
  render(
    
      <App/>
    
  );

  const valueFilter = screen.getByTestId('value-filter');
  const filterButton = screen.getByRole('button', { name: /filter/i });

  userEvent.type(valueFilter, '200000');
  userEvent.click(filterButton);

    // Verifique se os outros planetas não estão visíveis
  const otherPlanetName = screen.queryByText('Alderaan');
  expect(otherPlanetName).not.toBeInTheDocument();
});



//teste depois
// /// teste dos 60% função ordanate
// test('handleOrder atualiza o estado corretamente para input', () => {
//   const { getByTestId } = render(<Forms />); // Renderize o componente Forms

//   const inputElement = getByTestId('input-element'); // Substitua 'input-element' pelo atributo de teste do seu elemento input

//   fireEvent.change(inputElement, { target: { name: 'campo', value: 'NovoValor' } });

//   // Asserções para verificar se o estado foi atualizado corretamente
//   // Substitua formTwo e setFormTwo com o estado e a função corretos do seu componente
//   expect(formTwo).toEqual({ campo: 'NovoValor' });
// });

// test('handleOrder atualiza o estado corretamente para select', () => {
//   const { getByTestId } = render(<Forms />); // Renderize o componente Forms

//   const selectElement = getByTestId('select-element'); // Substitua 'select-element' pelo atributo de teste do seu elemento select

//   fireEvent.change(selectElement, { target: { name: 'campo', value: 'OpcaoSelecionada' } });

//   // Asserções para verificar se o estado foi atualizado corretamente
//   // Substitua formTwo e setFormTwo com o estado e a função corretos do seu componente
//   expect(formTwo).toEqual({ campo: 'OpcaoSelecionada' });
// });


// test('deve ordenar os resultados em ordem crescente', () => {
 
//   const apiResults = [
//     { population: '100', orbital_period: '200', diameter: '300', rotation_period: '400', surface_water: '500' },
//     { population: '50', orbital_period: '250', diameter: '350', rotation_period: '450', surface_water: '550' },
//     { population: '200', orbital_period: '100', diameter: '400', rotation_period: '300', surface_water: '600' },
//   ];

//   const { getByTestId, getAllByText } = render(<Forms />);
  
//   fireEvent.change(getByTestId('name-filter'), { target: { value: 'filter' } });
//   fireEvent.click(getByTestId('button-filter'));
  
//   expect(getAllByText(/filter/i).length).toBe(apiResults.length);

//   fireEvent.click(getByTestId('column-sort-button'));

//   const sortedResults = getAllByText(/filter/i);

//   expect(sortedResults[0]).toHaveTextContent('50');
//   expect(sortedResults[1]).toHaveTextContent('100');
//   expect(sortedResults[2]).toHaveTextContent('200');
// });
// ////

// test('teste final', ()=>{
//   render(<App />)
//   const planets = ['Tatooine', 'Alderaan', 'Yavin IV', 'Hoth', 'Dagobah', 'Bespin', 'Endor', 'Naboo', 'Coruscant', 'Kamino'];
//   const cres = screen.getByLabelText('Crescente');
//   const table = screen.getAllByTestId('planet-name');
  

// }
// )



