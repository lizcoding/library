/* 

--- TO DO ---
1. Save library to local storage
2. Allow user to edit title, author, and pages.
3. Make sure all delete (remove) buttons have different id's 
    or change id to class name.
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
    for (let property in last) {
        if (property == 'title' || property == 'author' ||property == 'pages') {
            let newGridItem = document.createElement("p");
            let itemContent = document.createTextNode(last[property]);
            newGridItem.appendChild(itemContent);
            newGridItem.className = last.bookId;
            libraryDisplay.appendChild(newGridItem);
        }
    }
    addStatusDropdown(last);
    addDeleteButton(last);
}

// ADD function adjustBookIndices() {}

function addDeleteButton(book) {
    // Enable Delete Button
    let newDeleteButton = document.createElement("button");
    itemContent = document.createTextNode("Delete");
    newDeleteButton.appendChild(itemContent);
    newDeleteButton.className = book.bookId;
    newDeleteButton.classList.add('remove-button');
    libraryDisplay.appendChild(newDeleteButton); 
    newDeleteButton.addEventListener('click', function() {
        const bookElements = Array.from(document.getElementsByClassName(book.bookId));
        console.log(bookElements);
        for (let item of bookElements) {
            item.remove();
        }
        myLibrary.splice(book.index, 1);
        // adjustBookIndices(); here
    });
}

function addStatusDropdown(book) {
    // Implement Modify Status Dropdown
    let statusButton = document.createElement("p");
    let itemContent = document.createTextNode(book.status);
    statusButton.className = book.bookId;
    statusButton.classList.add('status', 'item');
    statusButton.id = book.index;
    statusButton.appendChild(itemContent);

    statusButton.addEventListener('click', function(event) {
        // event.stopImmediatePropagation();
        statusButton.removeChild(statusButton.firstChild);
        let container = enableDropdownOptions(statusButton, myLibrary[statusButton.id]);
        let options = container.children;
        for (let option of options) {
            option.addEventListener('click', function(event) {
                statusButton.textContent = option.textContent;
                myLibrary[statusButton.id].status = option.textContent;
                // event.stopPropagation();
            });
        }
        statusButton.classList.add('status', 'item');
        statusButton.appendChild(container);
    });
    
    statusButton.addEventListener('mouseenter', function(event) {
        statusButton.textContent = '';
        const editText = document.createTextNode('Click to Edit');
        statusButton.appendChild(editText);
        // event.stopPropagation();
    });
    statusButton.addEventListener('mouseleave', function(event) {
        const statusText = document.createTextNode(myLibrary[statusButton.id].status);
        statusButton.removeChild(statusButton.firstChild);
        statusButton.appendChild(statusText);
        // event.stopPropagation();
    });
    
    libraryDisplay.appendChild(statusButton);
}

function enableDropdownOptions(book) {
    let unread = document.createElement("button");
    unread.className = 'status-dropdown';
    const unreadText = document.createTextNode('Unread');
    unread.appendChild(unreadText);

    let currentlyReading = document.createElement("button");
    currentlyReading.className = 'status-dropdown';
    const currentlyReadingText = document.createTextNode('Currently Reading');
    currentlyReading.appendChild(currentlyReadingText);

    let finishedReading = document.createElement("button");
    finishedReading.className = 'status-dropdown';
    const finishedReadingText = document.createTextNode('Finished Reading');
    finishedReading.appendChild(finishedReadingText);

    let dropdownContainer = document.createElement("div");
    dropdownContainer.className = 'options';

    dropdownContainer.appendChild(unread);
    dropdownContainer.appendChild(currentlyReading);
    dropdownContainer.appendChild(finishedReading);
    
    return (dropdownContainer);
}

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