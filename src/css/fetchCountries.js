const params = new URLSearchParams({
  fields: 'name,capital,population,languages,flags',
});

export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}?${params}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
