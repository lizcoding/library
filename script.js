/* 

--- TO DO ---
1. Allow user to change entry status
2. Save library to local storage

*/
let myLibrary = [];
let libraryDisplay = document.getElementById('current-library');
const form = document.getElementById('form');
const addButton = document.getElementById('add-book');
const BLOCK = 'block';
const FLEX = 'flex';
const NONE = 'none';
const UNAVAILABLE = 'N/A';
submitButton = null;

function Book(title, author, pages, status, index, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.index = index;
    this.bookId = id;
}

function addBookToDisplay() {
    let last = myLibrary[myLibrary.length - 1];
    console.log(last);
    for (let property in last) {
        if (property != 'index' && property != 'bookId') {
            let newGridItem = document.createElement("p");
            let itemContent = document.createTextNode(last[property]);
            newGridItem.appendChild(itemContent);
            newGridItem.className = last.bookId;
            libraryDisplay.appendChild(newGridItem);
        }
    }
    let newDeleteButton = document.createElement("button");
    let itemContent = document.createTextNode("Delete");
    newDeleteButton.appendChild(itemContent);
    newDeleteButton.className = last.bookId;
    newDeleteButton.id = "remove-button";
    newDeleteButton.addEventListener('click', function() {
        const bookElements = Array.from(document.getElementsByClassName(last.bookId));
        console.log(bookElements);
        for (let item of bookElements) {
            item.remove();
        }
        myLibrary.splice(last.index, 1);
        // adjustBookIndices();
    });
    libraryDisplay.appendChild(newDeleteButton);
}

// function adjustBookIndices() {}

function addBookToLibrary(entry) {
   let title = entry.elements.title.value;
   let author = entry.elements.author.value;
   let pages = entry.elements.pages.value;
   let status = entry.elements.status.value;
   let index = myLibrary.length;
   let bookId = 'book' + index;
   
   // set empty form values to default value
   if (!title) {
       title = UNAVAILABLE;
   }
   if (!author) {
       author = UNAVAILABLE;
   }
   if (!pages) {
       pages = UNAVAILABLE;
   }
   if (!status) {
       status = UNAVAILABLE;
   }

   // create new Book() object and add it to myLibrary array
   let newBook = new Book(title, author, pages, status, index, bookId);
   myLibrary.push(newBook);
   
   // update display to show new book entry
   form.reset();
   addBookToDisplay();
}

function addSubmitListener() {
    submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function() {
        // Update form/add book display on submit
        form.style.display = NONE;
        addButton.style.display = BLOCK;
        submitButton = null;
    });
}

function addListeners() {
    addButton.addEventListener('click', function() {
        addButton.style.display = NONE;
        form.style.display = FLEX;
        addSubmitListener();
    });
}

// Code Start
addListeners();