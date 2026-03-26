import { Book } from "./modules/bookModule.js";

let params = new URLSearchParams(window.location.search);
let bookId = params.get('id');
let userId = params.get('userId');

let allBooks = Book.getAllBooks();
let book = allBooks.find(book => book.id == bookId);
console.log(book.title);

let details = document.querySelector('.details');
let hasBorrowed = book.borrowedBy.includes(userId);
let isOutOfStock = book.quantity <= 0;

let borrowBtn = document.querySelector('.borrowBtn');

let borrowDate = Date.now(); 
let wariningMessage = document.querySelector('.wariningMessage');
let savedStartTime = Number(borrowDate);

function startCountdown(startTime, displayElement) {
    const twoDaysInMs = 2 * 24 * 60 * 60 * 1000; 
    const endTime = startTime + twoDaysInMs;

    const timerInterval = setInterval(() => {
        const now = Date.now();
        const distance = endTime - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            displayElement.textContent = "Time expired! Please return the book.";
            displayElement.style.color = "red";
            return;
        }

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        displayElement.textContent = `Return within: ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}


if (hasBorrowed && savedStartTime) {
    borrowBtn.textContent = "Borrowed";
    borrowBtn.classList.add("borrowed");
    borrowBtn.disabled = true;
    startCountdown(savedStartTime, wariningMessage);
} else if (isOutOfStock) {
    borrowBtn.textContent = "Out of Stock";
    borrowBtn.disabled = true;
}

details.innerHTML = `
<img src="${book.coverImg}" class="bockImage">
<div class='bookDetails'>
<div class=bookTitle>${book.title} </div>
<div class=bookDescription > ${book.descreption} </div>
<div class=bookInfo > <span class="infoLabel">Book Author :</span> ${book.author} </div>
<div class=bookInfo > <span class="infoLabel">Book Isbn :</span> ${book.isbn} </div>
<div class=bookInfo > <span class="infoLabel">Book Category :</span> ${book.category} </div>
<div class=bookInfo > <span class="infoLabel">Book Quantity :</span> ${book.quantity} </div>
<div class=bookInfo > <span class="infoLabel">Book Avilabilty :</span> ${book.avilable} </div>
</div>
`



