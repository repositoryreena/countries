// Get DOM elements
const themeSwitch = document.getElementById('theme-switch');
const searchInput = document.getElementById('search-input');
const regionSelect = document.getElementById('region-select');
const countryList = document.getElementById('country-list');

// Function to toggle dark/light theme
function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

// Event listener for theme switch button
themeSwitch.addEventListener('click', toggleTheme);

// Fetch country data from data.json
fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    // Function to display countries
    function displayCountries(countries) {
      countryList.innerHTML = '';
      countries.forEach((country) => {
        const countryCard = createCountryCard(country);
        countryList.appendChild(countryCard);
      });
    }

    // Create a country card element
    function createCountryCard(country) {
      const { name, population, region, capital, flags } = country;

      const countryCard = document.createElement('div');
      countryCard.classList.add('country-card');

      const flagImg = document.createElement('img');
      flagImg.src = flags.svg;
      flagImg.alt = `Flag of ${name}`;

      const countryName = document.createElement('h3');
      countryName.textContent = name;

      const countryPopulation = document.createElement('p');
      countryPopulation.textContent = `Population: ${population.toLocaleString()}`;

      const countryRegion = document.createElement('p');
      countryRegion.textContent = `Region: ${region}`;

      const countryCapital = document.createElement('p');
      countryCapital.textContent = `Capital: ${capital}`;

      countryCard.appendChild(flagImg);
      countryCard.appendChild(countryName);
      countryCard.appendChild(countryPopulation);
      countryCard.appendChild(countryRegion);
      countryCard.appendChild(countryCapital);

      return countryCard;
    }

    // Function to filter countries by search term
    function searchCountries(searchTerm) {
      const filteredCountries = data.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      displayCountries(filteredCountries);
    }

    // Event listener for search input
    searchInput.addEventListener('input', (event) => {
      const searchTerm = event.target.value.trim();
      searchCountries(searchTerm);
    });

    // Function to filter countries by region
    function filterByRegion(region) {
        const filteredCountries = data.filter((country) => country.region.toLowerCase() === region.toLowerCase() || region === 'all');
        if (filteredCountries.length === 0) {
          // If no countries match the selected region, display a message or handle it accordingly
          countryList.innerHTML = '<p>No countries found for this region.</p>';
        } else {
          displayCountries(filteredCountries);
        }
      }

    // Event listener for region select
    regionSelect.addEventListener('change', (event) => {
        const selectedRegion = event.target.value;
        filterByRegion(selectedRegion);
      });

    // Initial display of all countries
    displayCountries(data);
  });
