import { useEffect, useState } from 'react';
import './App.css';
import Table from './Components/Table';
import FetchApi from './utils/FetchApi';
import GlobalContext from './context/GlobalContext';
import { DataFiltersType, Planets } from './Types';

function App() {
  const [apiResults, setApiResults] = useState<Planets[]>([]);
  const [backupReApi, setbackupReApi] = useState<Planets[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      // setLoading(true);
      const results = await FetchApi('https://swapi.dev/api/planets');
      setApiResults(results);
      setbackupReApi(results);
      setLoading(false);
    }
    getData();
  }, []);

  function filterResultsByText(text: string) {
    if (text.length > 0) {
      const Results = backupReApi.filter(({ name }) => name.toLowerCase().includes(text));
      setApiResults(Results);
    } else {
      setApiResults(backupReApi);
    }
  }

  function filterResultsByValue(filters: DataFiltersType) {
    const filteredResults = apiResults.filter((result: any) => {
      const columnValue = Number(result[filters.column]);
      const filterValue = Number(filters.value);

      if (filters.filter === 'maior que') {
        return columnValue > filterValue;
      }
      if (filters.filter === 'menor que') {
        return columnValue < filterValue;
      }
      if (filters.filter === 'igual a') {
        return columnValue === filterValue;
      }
      return true; // Return true for unhandled cases
    });

    setApiResults(filteredResults);
  }

  // if (loading) {
  //   // return <h1>Carregando</h1>;
  // }

  return (
    <GlobalContext.Provider
      value={
       { apiResults, filterResultsByText, filterResultsByValue, loading }
}
    >
      <Table />
    </GlobalContext.Provider>
  );
}

export default App;
