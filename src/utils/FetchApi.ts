import { Planets } from '../Types';

export async function fetchApi(url: string) {
  try {
    const response = await fetch(url);
    const { results } = await response.json();

    const resultsFiltered = results.map(({ residents, ...rest }: Planets) => rest);

    return resultsFiltered;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
}
