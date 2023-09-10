let allModels = []; // This will hold all your data
let models = []; // This will hold the models for the current page
let modelsPerPage = 100; // This will determine how many models are shown per page
let currentPage = 0; // This will keep track of the current page

// Load all your data at once
function loadAllModels() {
  // Replace this with your actual data loading logic
  fetch('https://api.jollyporn.com/displayarchive')
    .then(response => response.json())
    .then(data => {
      allModels = data;
      renderPage(0); // Render the first page
    });
}

// Modify your renderPage function to update models/ Modify your renderPage function to update the current page
function renderPage(page) {
  const start = page * modelsPerPage;
  const end = start + modelsPerPage;
  models = allModels.slice(start, end);

  const modelsContainer = document.querySelector('.models');
  modelsContainer.innerHTML = ''; // Clear the container

  for (const model of models) {
    const modelElement = createModelElement(model);
    modelsContainer.appendChild(modelElement);
  }

  currentPage = page; // Update the current page
}

// Add event listeners to the buttons
const previousPageButton = document.querySelector('.previous-page');
const nextPageButton = document.querySelector('.next-page');
const previousPageButton2 = document.querySelector('.previous-page2');
const nextPageButton2 = document.querySelector('.next-page2');

previousPageButton.addEventListener('click', () => {
  if (currentPage > 0) { // Check if there is a previous page
    renderPage(currentPage - 1);
  }
});

nextPageButton.addEventListener('click', () => {
  const numPages = Math.ceil(allModels.length / modelsPerPage);
  if (currentPage < numPages - 1) { // Check if there is a next page
    renderPage(currentPage + 1);
  }
});

previousPageButton2.addEventListener('click', () => {
  if (currentPage > 0) { // Check if there is a previous page
    renderPage(currentPage - 1);
  }
});

nextPageButton2.addEventListener('click', () => {
  const numPages = Math.ceil(allModels.length / modelsPerPage);
  if (currentPage < numPages - 1) { // Check if there is a next page
    renderPage(currentPage + 1);
  }
});
// Get the search input element
const searchInput = document.getElementById('search-input');

// Add event listener to the search input for live search
searchInput.addEventListener('input', performSearch);

// Modify your search function to filter allModels
function performSearch() {
  const query = document.querySelector('#search-input').value.toLowerCase();

  // Filter allModels based on the query
  const searchResults = allModels.filter(model => model.model.toLowerCase().includes(query));

  // Clear the models container and render the search results
  const modelsContainer = document.querySelector('.models');
  modelsContainer.innerHTML = '';
  for (const model of searchResults) {
    const modelElement = createModelElement(model);
    modelsContainer.appendChild(modelElement);
  }
}



function createModelElement(model) {
  const modelElement = document.createElement('div');
  modelElement.className = 'model-row';

  const nameElement = document.createElement('div');
  nameElement.textContent = model.model;
  nameElement.className = 'model-name';

  const dateElement = document.createElement('div');
  const date = new Date(model.timestamp);
  dateElement.textContent = date.toLocaleDateString();
  dateElement.className = 'model-date';

  const linkElement = document.createElement('a');
  linkElement.href = model.link;
  linkElement.textContent = 'View';
  linkElement.className = 'model-link';
  linkElement.target = '_blank'; // Open link in a new window/tab

  modelElement.appendChild(nameElement);
  modelElement.appendChild(dateElement);
  modelElement.appendChild(linkElement);

  return modelElement;
}

// Create pagination


// Modify your renderPage function to call createPagination

// Call createPagination after loading all models

// Call loadAllModels when the page loads
window.onload = loadAllModels;
