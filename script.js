document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".category-button");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      handleCategoryButtonClick(button);
      scrollToTop(); 

    });
  });

  const currentCategory = localStorage.getItem('currentCategory');

  (currentCategory === 'straight') 
    fetchAndCreateStraightCards();

document.getElementById("straightButton").addEventListener("click", () => {
fetchAndCreateStraightCards();
});
});

    function handleCategoryButtonClick(button) {
      const categoryName = button.getAttribute("data-category");
      const categoryButtons = document.querySelectorAll(".category-button");

      categoryButtons.forEach((b) => b.classList.remove("active"));

      button.classList.add("active");

      filterAndDisplayCardsByCategory(categoryName);
    }

function filterAndDisplayCardsByCategory(categoryName) {
const allCards = Array.from(document.querySelectorAll(".box"));
const mainContainer = document.getElementById("cardContainer");
const cardsPerRow = 6;

const matchingCards = allCards.filter(card => card.getAttribute("data-category") === categoryName);

mainContainer.innerHTML = "";

let cardRow = document.createElement("div");
cardRow.classList.add("card-row");
for (let i = 0; i < matchingCards.length; i++) {
  const card = matchingCards[i];
  cardRow.appendChild(card);

  if ((i + 1) % cardsPerRow === 0 || i === matchingCards.length - 1) {
    mainContainer.appendChild(cardRow);
    cardRow = document.createElement("div");
    cardRow.classList.add("card-row");
  }
}
}

function createStraightCard(data) {
const cardContainer = document.createElement("div");
cardContainer.classList.add("box");
cardContainer.setAttribute("data-category", "straight");

cardContainer.addEventListener("click", () => {
  window.open(data.link, "_blank"); 
});

const card = document.createElement("div");
card.classList.add("card");

const cardImage = document.createElement("div");
cardImage.classList.add("card-image");

const image = document.createElement("img");
image.src = data.image;
image.alt = "Image";
cardImage.appendChild(image);

const cardContent = document.createElement("div");
cardContent.classList.add("card-content");

const h4 = document.createElement("h4");
h4.textContent = data.model;
cardContent.appendChild(h4);

const postTime = new Date(data.timestamp);  
const durationInSeconds = (Date.now() - postTime.getTime()) / 1000;
let timeAgo;
if (durationInSeconds < 60) { 
  timeAgo = Math.floor(durationInSeconds) + ' seconds ago';
} else if (durationInSeconds < 3600) { 
  timeAgo = Math.floor(durationInSeconds / 60) + ' minutes ago';
} else if (durationInSeconds < 86400) { 
  timeAgo = Math.floor(durationInSeconds / 3600) + ' hours ago';
} else { 
  timeAgo = Math.floor(durationInSeconds / 86400) + ' days ago';
}

const timeAgoElement = document.createElement("p");
timeAgoElement.textContent = timeAgo;
cardContent.appendChild(timeAgoElement);

const viewLeakLink = document.createElement("a");
viewLeakLink.href = data.link;
viewLeakLink.classList.add("view-leak-link");
viewLeakLink.target = "_blank";

const viewLeakButton = document.createElement("button");
viewLeakButton.classList.add("view-leak-button");
viewLeakButton.textContent = "View Leak";

viewLeakButton.addEventListener("click", (event) => {
  event.stopPropagation(); 
});

viewLeakLink.appendChild(viewLeakButton);
cardContent.appendChild(viewLeakLink);
card.appendChild(cardImage);
card.appendChild(cardContent);
cardContainer.appendChild(card);

return cardContainer;
}

async function fetchAndCreateStraightCards() {
const mainContainer = document.getElementById("cardContainer");
mainContainer.innerHTML = "";
const apiUrl = "https://api.jollyporn.com/straight"; 
const maxItems = 300; 
const cardsPerRow = 6; 

try {
  const response = await fetch(apiUrl);
  const data = await response.json();

  const mainContainer = document.getElementById("cardContainer");

  const cardsToShow = Math.min(Math.floor(data.length / cardsPerRow) * cardsPerRow, maxItems);

  let cardRow = document.createElement("div"); 
  cardRow.classList.add("card-row"); 

  for (let i = 0; i < cardsToShow; i++) {
    const item = data[i];

    if (!item) break; 

    const card = createStraightCard(item);
    cardRow.appendChild(card);

    if ((i + 1) % cardsPerRow === 0 || i === cardsToShow - 1) {
      mainContainer.appendChild(cardRow);
      cardRow = document.createElement("div");
      cardRow.classList.add("card-row");
    }
  }

  if (cardRow.children.length > 0) {
    mainContainer.appendChild(cardRow);
  }

  document.dispatchEvent(new Event('straightContentLoaded'));
} catch (error) {
  console.error("Error fetching data for straight category:", error);
}
}