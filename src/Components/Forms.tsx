// import React, { useContext, useState } from 'react';
// import GlobalContext from '../context/GlobalContext';
// import { DataFiltersType } from '../Types';

// const arrayOptions = [
//   'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

// const defaultFilters = {
//   column: arrayOptions[0],
//   filter: 'maior que',
//   value: 0,
// };

// export default function Forms() {
//   const { filterResultsByText, filterResultsByValue } = useContext(GlobalContext);
//   const [search, setSearch] = useState('');
//   const [choice, setChoice] = useState<DataFiltersType>(defaultFilters);
//   const [multipleFilters, setMultipleFilters] = useState<DataFiltersType[]>([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [options, setOptions] = useState(arrayOptions);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.target;
//     setSearch(value);
//     filterResultsByText(value);
//   };

//   const handleFiltersChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = event.target;
//     setChoice((prevFilters) => ({ ...prevFilters, [name]: value }));
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setShowFilter(true);
//     filterResultsByValue(choice);
//     setMultipleFilters((prevFilters) => [...prevFilters, choice]);
//     setOptions((prevOptions) => prevOptions.filter((option) => option !== choice.column));
//   };

//   return (
//     <>
//       <form onSubmit={ handleSubmit }>
//         <input
//           data-testid="name-filter"
//           type="text"
//           value={ search }
//           onChange={ handleChange }
//         />
//         <select
//           data-testid="column-filter"
//           value={ choice.column }
//           onChange={ handleFiltersChange }
//           name="column"
//         >
//           {options.map((option, i) => (
//             <option key={ i } value={ option }>
//               {option}
//             </option>
//           ))}
//         </select>
//         <select
//           data-testid="comparison-filter"
//           value={ choice.filter }
//           onChange={ handleFiltersChange }
//           name="filter"
//         >
//           <option value="maior que">maior que</option>
//           <option value="menor que">menor que</option>
//           <option value="igual a">igual a</option>
//         </select>
//         <input
//           type="number"
//           data-testid="value-filter"
//           name="value"
//           value={ choice.value }
//           onChange={ handleFiltersChange }
//         />
//         <button data-testid="button-filter">Filter</button>
//       </form>
//       {showFilter && (
//         <div>
//           {multipleFilters.map((filter, i) => (
//             <p key={ i }>
//               {filter.column}
//               {' '}
//               {filter.filter}
//               {' '}
//               {filter.value}
//               {' '}
//               <button>X</button>
//             </p>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }
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
export default function Forms() {
  const { filterResultsByText, filterResultsByValue } = useContext(GlobalContext);
  const [search, setSearch] = useState('');
  const [choiceFilters, setChoiceFilters] = useState<DataFiltersType>(dataFilters);
  const [multipleFilters, setMultipleFilters] = useState<DataFiltersType[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [options, setOptions] = useState(arrayOptions);

  function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setSearch(target.value);
    filterResultsByText(target.value);
  }
  function handleFilters({ target }: React.ChangeEvent<HTMLInputElement |
  HTMLSelectElement>) {
    const { name, value } = target;
    setChoiceFilters({
      ...choiceFilters,
      [name]: value,
    });
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
        <button data-testid="button-filter">Filter</button>
      </form>
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
