import { Book } from "./modules/bookModule.js"


let allBooks = Book.getAllBooks();

let searchInput = document.getElementById("searchInput");
let notDataDiv = document.getElementById("noData");
let allBooksArea = document.querySelector(".allBooks");



if (allBooks.length >= 1) {
    notDataDiv.remove();
    renderBooks(allBooks);
}

function renderBooks(books) {

    allBooksArea.innerHTML = "";

    books.forEach((book)=>{
        let card = document.createElement("div");
        card.classList.add("bookCard");

        card.innerHTML = `
        <img src="${book.coverImg}">
        <div class="bookTitle">${book.title}</div>
        <div class="bookInfo">Author: ${book.author}</div>
        <div class="bookInfo">ISBN: ${book.isbn}</div>
        <div class="bookInfo">Category: ${book.category}</div>
        <div class="bookInfo ">Quantity: <span class="bookQuantity">${book.quantity}</span> </div>
        <div class="bookInfo ">Avilable: <span class="bookAvilavility">${book.avilable}</span></div>

        <div class="actions">
            <button class="borrowBtn">Borrow</button>
            <button class="returnBtn">Return</button>
        </div>
        `;

        let borrowBtn = card.querySelector(".borrowBtn");
        let returnBtn = card.querySelector(".returnBtn");

        let newQuantity = card.querySelector('.bookQuantity');
        let newStatus = card.querySelector('.bookAvilavility');


        if(book.isBorrowed){
            borrowBtn.textContent = "Borrowed";
            borrowBtn.classList.add("borrowed");
            borrowBtn.disabled = true;
        }

        card.addEventListener('click' , ()=>{
            window.location.href = `detailsScreen.html?id=${book.id}`;
        });

        
        borrowBtn.addEventListener("click", (e)=>{
            e.stopPropagation();
            Book.borrowBook(book);
            book.isBorrowed = true;

            localStorage.setItem("books", JSON.stringify(allBooks));

            newQuantity.textContent = book.quantity;
            newStatus.textContent = book.avilable;

            borrowBtn.textContent = "Borrowed";
            borrowBtn.classList.add("borrowed");
            borrowBtn.disabled = true;
        }); //Borrow Click

        returnBtn.addEventListener("click", (e)=>{
            e.stopPropagation();

            if(book.isBorrowed){

                Book.returnBook(book);
                book.isBorrowed = false;

                localStorage.setItem("books", JSON.stringify(allBooks));
                 newQuantity.textContent = book.quantity;
            newStatus.textContent = book.avilable;

                borrowBtn.textContent = "Borrow";
                borrowBtn.classList.remove("borrowed");
                borrowBtn.disabled = false;
            }
        }); // return Click

        allBooksArea.appendChild(card);

    });

}



searchInput.addEventListener('keyup', () => {
    let filteredBooks = allBooks.filter((book) => {
        return book.title.includes(searchInput.value);
    });
    renderBooks(filteredBooks);
}); // search







