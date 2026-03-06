import { Book } from "./modules/bookModule.js"

let bookTitle = document.querySelector("#bookTitle");
let bookAuthor = document.querySelector("#bookAuthor");
let bookIsbn = document.querySelector("#bookIsbn");
let bookCategory = document.querySelector("#bookCategory");
let bookQuantity = document.querySelector("#bookQuantity");
let bookAvilabilty = document.querySelector("#avilable");
let bookNotAvilabilty = document.querySelector("#notAvilable");
let addButton = document.querySelector("#addButton");
let bookCover = document.querySelector("#bookCover");



let booksTable = document.querySelector("#booksTable");
let notDataDiv = document.getElementById("noData");


function emptyInputFields() {
    bookTitle.value = "";
    bookAuthor.value = "";
    bookIsbn.value = "";
    bookCategory.value = "";
    bookQuantity.value = "";
    bookAvilabilty.checked = false;
    bookNotAvilabilty.checked = false;
    bookCover.value = ""
  
}

let allBooks = Book.getAllBooks();
console.log(allBooks)
let isEditing = false;
let currentEditingId = null;



function actions(book) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.category}</td>
        <td>${book.quantity}</td>
        <td>${book.avilable}</td>
        <td><img src="${book.coverImg}" width="60" height="80"></td>
`
    let updateAction = document.createElement("td");
    let deleteAction = document.createElement("td");

    let updateBtn = document.createElement("button");
    updateBtn.textContent = "Update";

    updateBtn.addEventListener('click', () => {
        if (!isEditing) {
            bookTitle.value = book.title;
            bookAuthor.value = book.author;
            bookIsbn.value = book.isbn;
            bookCategory.value = book.category;
            bookQuantity.value = book.quantity;
            bookAvilabilty.checked = book.avilable;
            bookNotAvilabilty.checked = !book.avilable;

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

            Book.updateBook(book.id, newTitle, newAuthor, newIsbn, newCategory, Number(newQuantity) );
            row.cells[1].textContent = newTitle;
            row.cells[2].textContent = newAuthor;
            row.cells[3].textContent = newIsbn;
            row.cells[4].textContent = newCategory;
            row.cells[5].textContent = newQuantity;

            isEditing = false;
            currentEditingId = null;
            updateBtn.textContent = "Update";

            emptyInputFields();

        }
    }); //updateClick

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
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

addButton.addEventListener("click", () => {
    bookId++;
    if (Book.books.some(book => book.isbn === bookIsbn.value)) { // checks if bookIsbn unique or not
        alert("ISBN should be unique");
        return;
    }

    let book = new Book(bookId, bookTitle.value, bookAuthor.value, bookIsbn.value,
        bookCategory.value, Number(bookQuantity.value), bookAvilabilty.checked , bookCover.value);

    if (bookTitle.value == "" || bookAuthor.value == "") {
        alert("enter data")
    }
    else {
        Book.addBook(book);
        emptyInputFields();
        actions(book);
    }

}); //addClick





