import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { DataFiltersType } from '../Types';

const arrayOptions = ['population', 'orbital_period', 'diameter',
  'rotation_period', 'surface_water'];

const dataFilters = {
  column: arrayOptions[0],
  filter: 'maior que',
  value: 0,
};
const initialState = {
  ordenar: 'ASC',
  filter: 'population',
};

export default function Forms() {
  const {
    filterResultsByText,
    filterResultsByValue,
    apiResults,
    setApiResults } = useContext(GlobalContext);
  const [search, setSearch] = useState('');
  const [choiceFilters, setChoiceFilters] = useState<DataFiltersType>(dataFilters);
  const [multipleFilters, setMultipleFilters] = useState<DataFiltersType[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [options, setOptions] = useState(arrayOptions);
  const [formTwo, setFormTwo] = useState(initialState);

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setSearch(target.value);
    filterResultsByText(target.value);
  }
  function handleOrder({ target }:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormTwo({
      ...formTwo,
      [target.name]: target.value,
    });
  }
  function handleFilters({ target }: React.ChangeEvent<HTMLInputElement |
  HTMLSelectElement>) {
    const { name, value } = target;
    setChoiceFilters({
      ...choiceFilters,
      [name]: value,
    });
  }
  function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setShowFilter(true);
    filterResultsByValue(choiceFilters);
    setMultipleFilters([
      ...multipleFilters,
      choiceFilters,
    ]);
    hiddenOptions(choiceFilters.column);
  }

  function hiddenOptions(value: string) {
    if (choiceFilters.column.length && choiceFilters.column === value) {
      const newOptions = options.filter((op) => op !== value);
      setOptions(newOptions);
    }
  }
  function ordenate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    const saveOrder = formTwo.filter;
    const sortOrder = formTwo.ordenar === 'DESC' ? -1 : 1;

    const sortedResults = apiResults.sort((a, b) => {
      const aValue = a[saveOrder];
      const bValue = b[saveOrder];

      if (aValue === 'unknown' || bValue === 'unknown') {
        return aValue === 'unknown' ? 1 : -1; // Coloca 'unknown' por último
      }

      return (Number(aValue) - Number(bValue)) * sortOrder;
    });

    setApiResults([...sortedResults]);
  }

  return (
    <>
      <form>
        <input
          data-testid="name-filter"
          type="text"
          value={ search }
          onChange={ handleChange }
        />
        <select
          data-testid="column-filter"
          defaultValue={ choiceFilters.column }
          onChange={ handleFilters }
          name="column"
        >
          {options.map((option, i) => (
            <option
              key={ i }
              value={ option }
            >
              {option}
            </option>
          ))}
        </select>
        <select
          data-testid="comparison-filter"
          defaultValue={ choiceFilters.filter }
          onChange={ handleFilters }
          name="filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="value"
          defaultValue={ choiceFilters.value }
          onChange={ handleFilters }
        />
        <button onClick={ handleSubmit } data-testid="button-filter">Filter</button>
      </form>
      <select
        data-testid="column-sort"
        defaultValue={ choiceFilters.filter }
        onChange={ (event) => handleOrder(event) }
        name="filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label>
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          name="ordenar"
          onChange={ (event) => handleOrder(event) }
        />
        Crescente
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          name="ordenar"
          onChange={ (event) => handleOrder(event) }
        />
        Decrescente
      </label>
      <button data-testid="column-sort-button" onClick={ (event) => ordenate(event) }>
        Ordenar
      </button>
      {showFilter && (
        multipleFilters.map((filter, i) => (
          <div key={ i }>
            <p>
              {filter.column}
              {' '}
              {filter.filter}
              {' '}
              {filter.value}
              <button>X</button>
            </p>
          </div>
        ))
      )}
    </>
  );
}
