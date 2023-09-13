import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Components/Table';
import FetchApi from './utils/FetchApi';
import GlobalContext from './context/GlobalContext';
import { Planets } from './Types';

function App() {
  const [apiResults, setApiResults] = useState<Planets[]>([]);
  const [backupResultsApi, setBackupResultsApi] = useState<Planets[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const results = await FetchApi('https://swapi.dev/api/planets');
        setApiResults(results);
        setBackupResultsApi(results);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  function filterPlanets(text: string) {
    if (text.length > 0) {
      const filter = apiResults.filter(({ name }) => name.toLowerCase().includes(text));
      setApiResults(filter);
    }
    if (!text) {
      setApiResults(backupResultsApi);
    }
  }

  if (loading) {
    return <h1>Carregando</h1>;
  }

  return (
    <GlobalContext.Provider value={ { apiResults, filterPlanets } }>
      <Table />
    </GlobalContext.Provider>
  );
}

export default App;
