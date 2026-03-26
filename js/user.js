import { Book } from "./modules/bookModule.js"


let allBooks = Book.getAllBooks();

let searchInput = document.getElementById("searchInput");
let notDataDiv = document.getElementById("noData");
let allBooksArea = document.querySelector(".allBooks");

// get user data
let params = new URLSearchParams(window.location.search);
let userEmail = params.get('email');
let userId = params.get('userId');

let userData = document.querySelector('.userData')
userData.textContent = userEmail;

if (allBooks.length >= 1) {
    notDataDiv.remove();
    renderBooks(allBooks);
}

function renderBooks(books) {

    allBooksArea.innerHTML = "";
    books.forEach((book) => {
        if (!book.borrowedBy) book.borrowedBy = [];

        // Check if the current logged-in user is one of the borrowers
        const hasBorrowed = book.borrowedBy.includes(userId);
        const isOutOfStock = book.quantity <= 0;

        let card = document.createElement("div");
        card.classList.add("bookCard");

        card.innerHTML = `
        <img src="${book.coverImg}">
        <div class="bookTitle">${book.title}</div>
        <div class="bookInfo">Author: ${book.author}</div>
        <div class="bookInfo">ISBN: ${book.isbn}</div>
        <div class="bookInfo">Category: ${book.category}</div>
        <div class="bookInfo ">Quantity: <span class="bookQuantity">${book.quantity}</span> </div>
       

        <div class="actions">
            <button class="borrowBtn">Borrow</button>
            <button class="returnBtn">Return</button>
        </div>
        `;

        card.addEventListener('click' , ()=>{
            window.location.href = `detailsScreen.html?id=${book.id}&userId=${userId}`
        });

        let borrowBtn = card.querySelector(".borrowBtn");
        let returnBtn = card.querySelector(".returnBtn");

        if (hasBorrowed) {
            borrowBtn.textContent = "Borrowed"
            borrowBtn.classList.add("borrowed");
            borrowBtn.disabled = true;
        } else if (isOutOfStock) {
            borrowBtn.textContent = "Out of Stock";
            borrowBtn.disabled = true;
        }

       


        borrowBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            if (!hasBorrowed && !isOutOfStock) {
                // 1. Update Object State
                book.borrowedBy.push(userId);
                Book.borrowBook(book);

                localStorage.setItem("books", JSON.stringify(allBooks));
                renderBooks(allBooks);
            }
        });// borrow click

        returnBtn.addEventListener("click", (e) => {
            e.stopPropagation();

            if (hasBorrowed) {
                // 1. Remove this specific userId from the array
                book.borrowedBy = book.borrowedBy.filter(id => id !== userId);

                Book.returnBook(book);

                localStorage.setItem("books", JSON.stringify(allBooks));
                renderBooks(allBooks);
            } else {
                alert("You don't have this book!");
            }
        }); // return click

        allBooksArea.appendChild(card);
    });

}



searchInput.addEventListener('keyup', () => {
    let filteredBooks = allBooks.filter((book) => {
        return book.title.toLowerCase().includes(searchInput.value.toLowerCase());
    });
    renderBooks(filteredBooks);
}); // search







