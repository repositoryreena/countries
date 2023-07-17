// Function to fetch country data from data.json
function fetchCountryData() {
    return fetch('data.json')
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching country data:', error);
        return [];
      });
  }
  
  // Function to create a country card for each country
  function createCountryCards(countries) {
    const countryListContainer = document.getElementById('country-list');
  
    countries.forEach(country => {
      // Create a div element for the country card
      const countryCard = document.createElement('div');
      countryCard.classList.add('country-card');
  
      // Populate the country card with country information
      countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.name} Flag">
        <h3>${country.name}</h3>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
        <p>Capital: ${country.capital}</p>
      `;
  
      // Add click event listener to show detailed country information on click
      countryCard.addEventListener('click', () => showCountryDetails(country));
  
      // Append the country card to the container element
      countryListContainer.appendChild(countryCard);
    });
  }
  
  // Function to show detailed country information
  function showCountryDetails(country) {
    // Replace the content of the 'country-details' section with detailed information about the selected country
    const countryDetailsContainer = document.getElementById('country-details');
    countryDetailsContainer.innerHTML = `
      <button id="back-button" onclick="hideCountryDetails()">Back</button>
      <div class="country-info">
        <div class="flag">
          <img src="${country.flags.svg}" alt="${country.name} Flag" id="flag-image">
        </div>
        <div class="details">
          <h2 id="country-name">${country.name}</h2>
          <p><strong>Native Name:</strong> <span id="native-name">${country.nativeName}</span></p>
          <p><strong>Population:</strong> <span id="population">${country.population.toLocaleString()}</span></p>
          <p><strong>Region:</strong> <span id="region">${country.region}</span></p>
          <p><strong>Sub Region:</strong> <span id="sub-region">${country.subregion}</span></p>
          <!-- Add more details here -->
        </div>
      </div>
      <!-- Border Countries -->
      <div class="border-countries">
        ${country.borders.map(border => `<button>${border}</button>`).join('')}
      </div>
    `;
  
    // Display the 'country-details' section and hide the 'home' section
    const homeSection = document.querySelector('.home');
    const countryDetailsSection = document.querySelector('.country-details');
    homeSection.style.display = 'none';
    countryDetailsSection.style.display = 'block';
  }
  
  // Function to hide the detailed country information and show the 'home' section
  function hideCountryDetails() {
    const homeSection = document.querySelector('.home');
    const countryDetailsSection = document.querySelector('.country-details');
    homeSection.style.display = 'block';
    countryDetailsSection.style.display = 'none';
  }
  
  // Fetch the country data from data.json and generate country cards when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    fetchCountryData()
      .then(data => createCountryCards(data))
      .catch(error => console.error('Error fetching country data:', error));
  });
  