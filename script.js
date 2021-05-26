let addNew = document.getElementById("add")
let submit = document.getElementById("form")
let form = document.getElementById("form")
const list = document.querySelector('#book-list');

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}



class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(author) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.author === author) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }

}

function readBook(el) {

    if (el.textContent == "Read") {
        return el.textContent = "Not Read"
    }
    if (el.textContent == "Not Read") {
        return el.textContent = "Read"
    }

}

function deleteBook(el) {
    if (el.classList.contains('delete')) {
        if (confirm("Do you want to remove the book permanently ?")) {
            Store.removeBook(el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML);
            el.parentElement.parentElement.remove();
        }
    }
}


function readCheck(x) {
    if (x) {
        return "Read"
    } else {
        return "Not Read"
    }
}

function createBook(book) {

    const row = document.createElement('tr');
    row.innerHTML = `
                    <tr>
                        <td>"${book.title}"</td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td><button class = "btn btn-primary read">${readCheck(book.read)}</button></td>
                        <td><button class = "btn btn-danger delete">X</button></td>
                    </tr>`;

    list.appendChild(row);

}


function displayBooks() {

    list.innerHTML = ""
    for (let book of Store.getBooks()) {
        createBook(book)
    }
}

function clearFields() {
    document.getElementById("title").value = ""
    document.getElementById("author").value = ""
    document.getElementById("pages").value = ""
    document.getElementById("read").value = ""
}
document.addEventListener('DOMContentLoaded', displayBooks())


//add book event handler
submit.addEventListener('submit', (e) => {
    e.preventDefault()
        // get input value
    let title = document.getElementById("title").value
    let author = document.getElementById("author").value
    let pages = document.getElementById("pages").value
    let read = document.getElementById("read").checked
        // validation
    if (title === '' || author === '' || pages === '') {
        alert('Please fill in all fields');
    } else {
        // Instatiate book

        let book = new Book(title, author, pages, read)

        Store.addBook(book)

        displayBooks()

        clearFields()

        form.style.display = 'none'
        addNew.style.display = 'inline'
    }

})

document.querySelector('#book-list').addEventListener('click', (e) => {
    // read change
    readBook(e.target)

    // delete book
    deleteBook(e.target);

});

addNew.addEventListener('click', () => {
    form.style.display = 'block'
    addNew.style.display = 'none'
})