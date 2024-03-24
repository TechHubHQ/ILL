let countryCodes;

// Fetch country codes JSON
fetch("../../../Frontend/Static/json/CountryCodes.json")
  .then(response => response.json())
  .then(data => {
    countryCodes = data;
    initializeCountryCodeDropdown(); 
  })
  .catch(error => {
    console.error('Error fetching country codes:', error);
  });

function initializeCountryCodeDropdown() {
  if (!Array.isArray(countryCodes)) {
    console.error('Country codes data is not an array');
    return;
  }

  let select = document.getElementById("country-code");

  countryCodes.forEach(country => {
    let option = document.createElement("option");
    option.value = country.dial_code;
    option.text = country.name + " - " + country.dial_code; 

    select.appendChild(option);
  }); 
}
