// Book Class: Represents a Book
class Book {
  constructor(
    title,
    author,
    isbn,
    studentName,
    studentId,
    issueDate,
    expiryDate
  ) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.studentName = studentName;
    this.studentId = studentId;
    this.issueDate = issueDate;
    this.expiryDate = expiryDate;
  }
}
// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks1();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
      <td >${book.title}</td>
      <td >${book.author}</td>
      <td >${book.isbn}</td>
      <td >${book.studentName}</td>
      <td >${book.studentId}</td>
      <td >${book.issueDate}</td>
      <td >${book.expiryDate}</td>
      <td ><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
    document.querySelector("#studentName").value = "";
    document.querySelector("#studentId").value = "";
    document.querySelector("#issueDate").value = "";
    document.querySelector("#expiryDate").value = "";
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks1() {
    let books1;
    if (localStorage.getItem("books1") === null) {
      books1 = [];
    } else {
      books1 = JSON.parse(localStorage.getItem("books1"));
    }

    return books1;
  }

  static addBook(book) {
    const books1 = Store.getBooks1();
    books1.push(book);
    localStorage.setItem("books1", JSON.stringify(books1));
  }

  static removeBook(isbn) {
    const books1 = Store.getBooks1();

    books1.forEach((book, index) => {
      if (book.isbn === isbn) {
        books1.splice(index, 1);
      }
    });

    localStorage.setItem("books1", JSON.stringify(books1));
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;
  const studentName = document.querySelector("#studentName").value;
  const studentId = document.querySelector("#studentId").value;
  const issueDate = document.querySelector("#issueDate").value;
  const expiryDate = document.querySelector("#expiryDate").value;

  // Validate
  if (
    title === "" ||
    author === "" ||
    isbn === "" ||
    studentName === "" ||
    studentId === "" ||
    issueDate === "" ||
    expiryDate === ""
  ) {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instatiate book
    const book = new Book(
      title,
      author,
      isbn,
      studentName,
      studentId,
      issueDate,
      expiryDate
    );

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert("Order Added", "success");

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert("Order Removed", "success");
});

const searchInput = document.querySelector(".searchInput");
searchInput.addEventListener("keyup", tableSearch);
function tableSearch() {
  let input = document.querySelector(".searchInput");
  let filter = input.value.toUpperCase();
  let table = document.querySelector("#book-list");
  let tr = table.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td1 = tr[i].getElementsByTagName("td")[1];
    td2 = tr[i].getElementsByTagName("td")[2];
    td3 = tr[i].getElementsByTagName("td")[3];
    td4 = tr[i].getElementsByTagName("td")[4];
    td5 = tr[i].getElementsByTagName("td")[5];
    td6 = tr[i].getElementsByTagName("td")[6];
    if (td || td1 || td2 || td3 || td4 || td5 || td6) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      txtValue3 = td3.textContent || td3.innerText;
      txtValue4 = td4.textContent || td4.innerText;
      txtValue5 = td5.textContent || td5.innerText;
      txtValue6 = td6.textContent || td6.innerText;
      if (
        txtValue.toUpperCase().indexOf(filter) > -1 ||
        txtValue1.toUpperCase().indexOf(filter) > -1 ||
        txtValue2.toUpperCase().indexOf(filter) > -1 ||
        txtValue3.toUpperCase().indexOf(filter) > -1 ||
        txtValue4.toUpperCase().indexOf(filter) > -1 ||
        txtValue5.toUpperCase().indexOf(filter) > -1 ||
        txtValue6.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
