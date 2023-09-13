import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

const defaultFilters = {
  column: 'population',
  filter: 'maior que',
  value: 0,
};

export default function Forms() {
  const { filterResultsByText, filterResultsByValue } = useContext(GlobalContext);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(defaultFilters);
  const [showFilter, setShowFilter] = useState(false);

  const handleChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;
    setSearch(value);
    filterResultsByText(value);
  };

  const handleFiltersChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setShowFilter(true);
    filterResultsByValue(filters);
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input
          data-testid="name-filter"
          type="text"
          value={ search }
          onChange={ handleChange }
        />
        <select
          data-testid="column-filter"
          value={ filters.column }
          onChange={ handleFiltersChange }
          name="column"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          value={ filters.filter }
          onChange={ handleFiltersChange }
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
          value={ filters.value }
          onChange={ handleFiltersChange }
        />
        <button data-testid="button-filter">Filter</button>
      </form>
      {showFilter && (
        <p>
          {filters.column}
          {' '}
          {filters.filter}
          {' '}
          {filters.value}
        </p>
      )}
    </>
  );
}
