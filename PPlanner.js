
const apiEndpoint = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/';
// Fetches parties from the API and updates the DOM
function fetchParties() {
  fetch(apiEndpoint)
    .then(response => response.json())
    .then(parties => renderParties(parties))
    .catch(error => console.error('Error fetching parties:', error));
}

// Renders party data to the party list table in the DOM
function renderParties(parties) {
  const tableBody = document.getElementById('party-list-body'); // Ensure you have a tbody with this ID in your HTML
  tableBody.innerHTML = ''; 
  parties.forEach(party => {
    const row = tableBody.insertRow();
    row.innerHTML = `
      <td>${party.name}</td>
      <td>${party.date}</td>
      <td>${party.time}</td>
      <td>${party.location}</td>
      <td>${party.description}</td>
      <td><button class="delete-button" onclick="deleteParty(${party.id})">Delete</button></td>
    `;
  });
}

// Adds a new party via the API and updates the DOM
function addParty(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const partyData = {
    name: formData.get('name'),
    date: formData.get('date'),
    time: formData.get('time'),
    location: formData.get('location'),
    description: formData.get('description')
  };

  fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(partyData),
  })
  .then(response => response.json())
  .then(() => fetchParties()) // Refresh the party list
  .catch(error => console.error('Error adding party:', error));
}

// Deletes a party via the API and updates the DOM
function deleteParty(partyId) {
  fetch(`${apiEndpoint}/${partyId}`, {
    method: 'DELETE',
  })
  .then(() => fetchParties()) // Refresh the party list
  .catch(error => console.error('Error deleting party:', error));
}

// Initializes the application
function initialize() {
  const addPartyForm = document.getElementById('new-party-form'); // Ensure your form has this ID
  addPartyForm.addEventListener('submit', addParty);

  fetchParties(); // Load the initial list of parties
}

// Call initialize to set everything up
initialize();

