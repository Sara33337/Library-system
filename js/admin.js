import { Book } from "./modules/bookModule.js"

let bookTitle = document.querySelector("#bookTitle");
let bookAuthor = document.querySelector("#bookAuthor");
let bookIsbn = document.querySelector("#bookIsbn");
let bookCategory = document.querySelector("#bookCategory");
let bookQuantity = document.querySelector("#bookQuantity");
let bookAvilabilty = document.querySelector("#avilable");
let bookNotAvilabilty = document.querySelector("#notAvilable");
let addButton = document.querySelector("#addButton");
let addBook = document.getElementById('addBook');
let bookCover = document.querySelector("#bookCover");
let bookDescription = document.querySelector('#bookDescreption');

let booksTable = document.querySelector("#booksTable");
let notDataDiv = document.getElementById("noData");
let inputForm = document.getElementById('inputForm');

// get user data
let params = new URLSearchParams(window.location.search);
let userEmail = params.get('email');
let userId = params.get('userId')
console.log(userEmail);
console.log(userId);


function emptyInputFields() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookIsbn.value = "";
    bookCategory.value = "";
    bookQuantity.value = "";
    bookAvilabilty.checked = false;
    bookNotAvilabilty.checked = false;
    bookCover.value = "";
    bookDescription.value = ""
  
}

let allBooks = Book.getAllBooks();
console.log(allBooks)
let isEditing = false;
let currentEditingId = null;


inputForm.style.display = 'none';
addButton.addEventListener('click' , ()=>{
    inputForm.style.display = 'block'

}); // addButton click

function actions(book) {
    let row = document.createElement("tr");
    let shortDesc = book.descreption.length > 30 
        ? book.descreption.substring(0, 30) + "..." 
        : book.descreption;

    row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.category}</td>
        <td>${book.quantity}</td>
        <td>${shortDesc}</td>
        <td>${book.avilable}</td>
        
        <td><img src="${book.coverImg}" width="60" height="80"></td>
`
    let updateAction = document.createElement("td");
    let deleteAction = document.createElement("td");

    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";
    updateBtn.classList.add("btn-update")

    updateBtn.addEventListener('click', () => {
        inputForm.style.display = 'block';
        if (!isEditing) {
            bookTitle.value = book.title;
            bookAuthor.value = book.author;
            bookIsbn.value = book.isbn;
            bookCategory.value = book.category;
            bookQuantity.value = book.quantity;
            bookAvilabilty.checked = book.avilable;
            bookNotAvilabilty.checked = !book.avilable;
            bookCover.value = book.coverImg;
            bookDescription.value = book.descreption;

            isEditing = true;
            currentEditingId = book.id;

            updateBtn.textContent = "Save";

        }
        else if (isEditing) {
            let newTitle = bookTitle.value;
            let newAuthor = bookAuthor.value;
            let newIsbn = bookIsbn.value;
            let newCategory = bookCategory.value;
            let newQuantity = bookQuantity.value;
            let newDescription = bookDescription.value;
            let newCoverImg = bookCover.value;

            let shortDescription = newDescription.length > 30 ? newDescription.substring(0, 30) + "..." : newDescription;

            Book.updateBook(book.id, newTitle, newAuthor, newIsbn, newCategory, Number(newQuantity) , newDescription, newCoverImg );
            row.cells[1].textContent = newTitle;
            row.cells[2].textContent = newAuthor;
            row.cells[3].textContent = newIsbn;
            row.cells[4].textContent = newCategory;
            row.cells[5].textContent = newQuantity;
            row.cells[6].textContent = shortDescription;
            row.cells[7].innerHTML = `<img src="${newCoverImg}" width="60" height="80"></img>`;

            isEditing = false;
            currentEditingId = null;
            updateBtn.textContent = "Update";

            emptyInputFields();

        }
    }); //updateClick

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn-delete");

    deleteBtn.addEventListener("click", () => {
        if (confirm(`Delete ${book.title}?`)) {
            Book.deleteBook(book.id);
            row.remove(); // remove row
        }
    }); // deleteClick

    updateAction.append(updateBtn);
    deleteAction.append(deleteBtn)
    row.appendChild(updateAction);
    row.appendChild(deleteAction);


    booksTable.appendChild(row);
}

if (allBooks.length >= 1){
    notDataDiv.remove();
    allBooks.forEach(book => {
    actions(book);
});}

// id creation //
let bookId;
if (allBooks.length == 0) {
    bookId = 0;
}
else {
    bookId = allBooks[allBooks.length - 1].id;
}



addBook.addEventListener("click", () => {
    bookId++;
    if (Book.books.some(book => book.isbn === bookIsbn.value)) { // checks if bookIsbn unique or not
        alert("ISBN should be unique");
        return;
    }

    let book = new Book(bookId, bookTitle.value, bookAuthor.value, bookIsbn.value,
        bookCategory.value, Number(bookQuantity.value), bookDescription.value, bookAvilabilty.checked , bookCover.value);

    if (bookTitle.value == "" || bookAuthor.value == "") {
        alert("enter data")
    }
    else {
        Book.addBook(book);
        actions(book);
        emptyInputFields();
        inputForm.style.display = 'none';
      
    }

}); //addbook click





