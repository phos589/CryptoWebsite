import { cryptoData } from '../script/data.js';
import { featureData } from '../script/dataTitle.js';

const coinList = document.getElementById('coinList');
const pagination = document.getElementById('pagination');
const coinsPerPage = 5;
let currentPage = 1;

function displayCoins(start, end) {
    coinList.innerHTML = '';

    for (let i = start; i < end && i < cryptoData.length; i++) {
        const crypto = cryptoData[i];
        const row = document.createElement('tr');
        
        // Check if crypto.change contains a "-"
        if (crypto.change.includes("-")) {
            row.innerHTML = `
                <td style="display: flex; align-items: center;">
                    <img src="${crypto.image}" alt="${crypto.name}" style="width: 100px;">
                    <span>${crypto.name}</span>
                </td>
                <td>${crypto.price}</td>
                <td style="color: rgb(200, 2, 2);">${crypto.change}</td>
                <td>${crypto.marketCap}</td>
            `;
        } else {
            row.innerHTML = `
                <td style="display: flex; align-items: center;">
                    <img src="${crypto.image}" alt="${crypto.name}" style="width: 100px;">
                    <span>${crypto.name}</span>
                </td>
                <td>${crypto.price}</td>
                <td style="color: rgb(1, 200, 1);">${crypto.change}</td>
                <td>${crypto.marketCap}</td>
            `;
        }
        
        coinList.appendChild(row);
    }
}

function createPaginationButtons() {
    pagination.innerHTML = ''; 
    const totalPages = Math.ceil(cryptoData.length / coinsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            const start = (currentPage - 1) * coinsPerPage;
            const end = start + coinsPerPage;
            displayCoins(start, end);
            updatePaginationButtons();
        });
        pagination.appendChild(pageButton);
    }
}

function updatePaginationButtons() {
    const pageButtons = pagination.querySelectorAll('button');
    pageButtons.forEach((button, index) => {
        if (index === currentPage - 1) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Initial display
displayCoins(0, coinsPerPage);
createPaginationButtons();
updatePaginationButtons();

const featureGrid = document.querySelector('.feature-grid');

// Loop through featureData and create HTML for each item
featureData.forEach(feature => {
  // Create a div for each feature
  const featureDiv = document.createElement('div');
  featureDiv.classList.add('feature');

  // Create an h3 element with the title and the image
  const h3Element = document.createElement('h3');
  h3Element.innerHTML = `${feature.title} <img src="${feature.imageSrc}" style="width: 70px; margin-left: 10px;">`;

  // Create a p element with the description
  const pElement = document.createElement('p');
  pElement.textContent = feature.description;

  // Append h3 and p elements to the featureDiv
  featureDiv.appendChild(h3Element);
  featureDiv.appendChild(pElement);

  // Append the featureDiv to the featureGrid
  featureGrid.appendChild(featureDiv);
});

