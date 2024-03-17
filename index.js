const booksKey = "libraryBooks";

function prefillInputs() {
  document.getElementById('title').value = 'The Jungle Book';
  document.getElementById('author').value = 'Rudyard Keepling';
  document.getElementById('isbn').value = '1234567890';
  document.getElementById('pages').value = '300';
}

// Call the prefill function when the page loads
window.onload = prefillInputs;

function addBook(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;
  const pages = document.getElementById("pages").value;

  // Basic validation
  if (!title || !author || !isbn) {
    document.getElementById("error").innerText =
      "Please fill in all mandatory fields.";
    return;
  }

  // Validate author name
  if (!/^[A-Za-z ]+$/.test(author)) {
    document.getElementById("error").innerText =
      "Author name can only contain alphabets.";
    return;
  }

  // Check if ISBN is already in the library
  const existingBooks = getBooks();
  if (existingBooks.some((book) => book.isbn === isbn)) {
    document.getElementById("error").innerText =
      "Book with the same ISBN already exists.";
    return;
  }

  // Add the book to local storage
  const newBook = { title, author, isbn, pages };
  existingBooks.push(newBook);
  saveBooks(existingBooks);

  // Clear form, display book card, show confirmation
  document.getElementById("addBookForm").reset();
  document.getElementById("error").innerText = "";
  displayBookCard(newBook);
  showConfirmation("Book added successfully!");
}

function searchBooks() {
  const searchInput = document.getElementById("bookSearch").value.toLowerCase();

  // Search books in local storage
  const existingBooks = getBooks();
  const searchResult = existingBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchInput) ||
      book.author.toLowerCase().includes(searchInput) ||
      book.isbn.includes(searchInput)
  );

  const bookResultContainer = document.getElementById("bookResult");
  bookResultContainer.innerHTML = "";

  if (searchResult.length === 0) {
    bookResultContainer.innerText = "No books found.";
  } else {
    searchResult.forEach((book) => displayBookCard(book));
  }

  bookResultContainer.style.display = "block";
}

function viewAllBooks() {
  // Retrieve all books from local storage
  const existingBooks = getBooks();
  const bookResultContainer = document.getElementById("bookResult");
  bookResultContainer.innerHTML = "";

  if (existingBooks.length === 0) {
    bookResultContainer.innerText = "No books available.";
  } else {
    existingBooks.forEach((book) => displayBookCard(book));
  }

  bookResultContainer.style.display = "block";
}

function getBooks() {
  const existingBooksJSON = localStorage.getItem(booksKey);
  return existingBooksJSON ? JSON.parse(existingBooksJSON) : [];
}

function saveBooks(books) {
  localStorage.setItem(booksKey, JSON.stringify(books));
}

function displayBookCard(book) {
  const bookResultContainer = document.getElementById("bookResult");
  const card = document.createElement("div");
  card.classList.add("book-card");

  const title = document.createElement("h3");
  title.innerText = book.title;

  const author = document.createElement("p");
  author.innerText = "Author: " + book.author;

  const isbn = document.createElement("p");
  isbn.innerText = "ISBN: " + book.isbn;

  const pages = document.createElement("p");
  pages.innerText = "Pages: " + (book.pages || "N/A");

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(isbn);
  card.appendChild(pages);
  bookResultContainer.appendChild(card);
}

function showConfirmation(message) {
  const confirmationMessage = document.getElementById("confirmation");
  confirmationMessage.innerText = message;
  confirmationMessage.style.display = "block";

  // Hide confirmation message after 3 seconds
  setTimeout(() => {
    confirmationMessage.style.display = "none";
  }, 3000);
}
