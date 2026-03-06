class Book {
    static books = [];

    constructor(id, title, author, isbn, category, quantity, avilable , 
        coverImg = "eBook.jpg" , isBorrowed = false )  {

        this.validation(title, "string", "title");
        this.validation(author, "string", "author");
        this.validation(isbn, "string", "isbn");
        this.validation(category, "string", "category");
        this.validation(quantity, "number", "quantity");
        this.validation(avilable, "boolean", "avilable");

        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.category = category;
        this.quantity = quantity;
        this.avilable = avilable;
        this.coverImg = coverImg;
        this.isBorrowed = isBorrowed;
    

    };


    validation(variable, type, varName) {
        if (typeof variable !== type) {
            throw new Error(`type of ${varName} must be ${type}`);
        }
        return true;
    }


    static addBook(book) {
        if (!(book instanceof Book)) {
            throw new Error("book must be of type Book");
        }
        this.books.push(book);
        localStorage.setItem("books", JSON.stringify(this.books));
        return this.books;
    }

    static deleteBook(bookId) {

        this.books = this.books.filter((element) => {
            return element.id !== bookId;
        });
        localStorage.setItem("books", JSON.stringify(this.books));
        return this.books;
    }

    static getAllBooks() {
        let localBooks = JSON.parse(localStorage.getItem("books")) || [];
        if (localBooks.length >= 1) {
            for (let i = 0; i < localBooks.length; i++) {
                this.books.push(localBooks[i])
            }
            return this.books;
        }
        else{
            return [];
        }
    }

    static updateBook(id, title, author, isbn, category, q) {
        let book = this.books.find(book => book.id == id);
        if (book) {
            book.title = title;
            book.author = author;
            book.isbn = isbn;
            book.category = category;
            book.quantity = q;
            console.log("Updated successfully");
            localStorage.setItem("books", JSON.stringify(this.books));
            return this.books;
        } else {
            console.log("This book not found");
        }
    }

    static borrowBook(book) {
        if (book.quantity > 0) {
            book.quantity -= 1;
            book.avilable = book.quantity > 0; //true or false
            localStorage.setItem("books", JSON.stringify(this.books));
        }
        else {
            alert("Book is not available");
        }
        return this.books;
    }

    static returnBook(book) {
        book.quantity += 1;
        if (book.quantity > 0) {
            book.avilable = true;
        }
        else {
            book.avilable = false;
        }
        localStorage.setItem("books", JSON.stringify(this.books));
        return this.books;
    }


}

export { Book };

