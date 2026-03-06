import {Book} from "./modules/bookModule.js";

let params = new URLSearchParams(window.location.search);
let bookId = params.get('id'); 

let allBooks = Book.getAllBooks();
let book = allBooks.find(book => book.id == bookId);
console.log(book.title);

let details = document.querySelector('.details');

details.innerHTML=`
<img src="${book.coverImg}" class="bockImage">
<div class='bookDetails'>
<div class=bookTitle>${book.title} </div>
<div class=bookInfo > <span class="infoLabel">Book Author :</span> ${book.author} </div>
<div class=bookInfo > <span class="infoLabel">Book Isbn :</span> ${book.isbn} </div>
<div class=bookInfo > <span class="infoLabel">Book Category :</span> ${book.category} </div>
<div class=bookInfo > <span class="infoLabel">Book Quantity :</span> ${book.quantity} </div>
<div class=bookInfo > <span class="infoLabel">Book Avilabilty :</span> ${book.avilable} </div>
</div>


`



