import './css/styles.css';
import { fetchCountries } from './css/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const countriesList = document.querySelector('.country-list');
const inputElement = document.querySelector('#search-box');
const countryItem = document.querySelector('.js-country-info');

inputElement.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const name = e.target.value.trim();
  if (!name) {
    return;
  } else {
    fetchCountries(name)
      .then(countries => renderCountries(countries))
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  }
}

function renderCountries(country) {
  if (country.length === 1) {
    const markup = country
      .map(({ name, capital, population, flags, languages }) => {
        return `<li>  
        <div class="country-info">
        <img src="${flags.svg}" width="25" height="20"/>
        <h2> ${name}</h2>
        </div>       
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${languages.map(a => a.name)} </p>
        </li>`;
      })
      .join('');
    countriesList.innerHTML = markup;
  } else if (country.length >= 2 && country.length < 10) {
    const markup = country
      .map(({ name, flags }) => {
        return `<li>  
        <div class="country-info">
        <img src="${flags.svg}" width="25" height="20"/>
        <h2> ${name}</h2>        
        </li>`;
      })
      .join('');
    countriesList.innerHTML = markup;
  } else {
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}
