import { cryptoData } from '../script/data.js';

const coinList = document.getElementById('coinList');
const pagination = document.getElementById('pagination');
const coinsPerPage = 5;
let currentPage = 1;

function displayCoins(start, end) {
    coinList.innerHTML = ''; 

    for (let i = start; i < end && i < cryptoData.length; i++) {
        const crypto = cryptoData[i];
        const row = document.createElement('tr');
        row.innerHTML = `
        <td style="display: flex; align-items: center;"><img src="${crypto.image}" alt="${crypto.name}" style="width: 100px;">${crypto.name}</td>
        <td>${crypto.price}</td>
        <td>${crypto.change}</td>
        <td>${crypto.marketCap}</td>
        `;
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

