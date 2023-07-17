// Get DOM elements
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

// ... (rest of the code remains unchanged)


// Fetch country data from data.json
fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    // Display all countries on the homepage
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

    // Filter countries by search input
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

    // Filter countries by region
    function filterByRegion(region) {
      if (region === 'all') {
        displayCountries(data);
      } else {
        const filteredCountries = data.filter((country) => country.region === region);
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
