import React, { useState } from "react";

function App() {
  // State variables to manage view and form data
  const [activeView, setActiveView] = useState("home");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [pages, setPages] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Handle search functionality
  const handleSearch = () => {
    // Simulate search logic based on the search query (replace with API call)
    const filteredBooks = mockBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  // Handle form submission to add a book
  const handleAddBook = (e) => {
    e.preventDefault();
    console.log({ title, author, genre, publishedDate, pages });
    // Reset form and switch to home view after submitting
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublishedDate("");
    setPages("");
    setActiveView("home");
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem} onClick={() => setActiveView("home")}>
            <a href="#" style={styles.navLink}>
              Home
            </a>
          </li>
          <li style={styles.navItem} onClick={() => setActiveView("addBook")}>
            <a href="#" style={styles.navLink}>
              Add Book
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="/contact" style={styles.navLink}>
              Contact
            </a>
          </li>
          <li style={styles.navItem}>
            <a href="/about" style={styles.navLink}>
              About
            </a>
          </li>
        </ul>
      </nav>

      {/* Conditionally Render Views */}
      {activeView === "home" && (
        <div>
          {/* Search Section */}
          <div style={styles.searchSection}>
            <h2 style={styles.formHeading}>Search Books</h2>
            <div style={styles.searchForm}>
              <input
                type="text"
                placeholder="Search by title, author, or genre"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleSearch} style={styles.submitButton}>
                Search
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div style={styles.resultsSection}>
              <h2 style={styles.formHeading}>Search Results</h2>
              <ul style={styles.resultsList}>
                {searchResults.map((book, index) => (
                  <li key={index} style={styles.resultItem}>
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <p>Pages: {book.pages}</p>
                    <p>Published Date: {book.publishedDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeView === "addBook" && (
        <div style={styles.formSection}>
          <h2 style={styles.formHeading}>Add a New Book</h2>
          <form onSubmit={handleAddBook} style={styles.form}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Published Date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              style={styles.input}
            />
            <input
              type="number"
              placeholder="Pages"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              style={styles.input}
            />
            <button type="submit" style={styles.submitButton}>
              Add Book
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

// Sample mock data for books (replace with actual API or database query)
const mockBooks = [
  {
    title: "1984",
    author: "George Orwell",
    genre: "Fiction",
    pages: 328,
    publishedDate: "1949",
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    pages: 412,
    publishedDate: "1965",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fiction",
    pages: 310,
    publishedDate: "1937",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    pages: 180,
    publishedDate: "1925",
  },
];

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f7fc",
    minHeight: "100vh",
    padding: "20px",
    color: "#333",
  },
  navbar: {
    backgroundColor: "#2c3e50",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "30px",
  },
  navList: {
    display: "flex",
    justifyContent: "space-around",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 15px",
    cursor: "pointer",
  },
  navLink: {
    color: "#ecf0f1",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
  searchSection: {
    marginBottom: "30px",
    textAlign: "center",
  },
  formHeading: {
    fontSize: "28px",
    color: "#2c3e50",
    marginBottom: "20px",
  },
  searchForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    width: "300px",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  resultsSection: {
    marginTop: "20px",
    textAlign: "center",
  },
  resultsList: {
    listStyleType: "none",
    padding: 0,
  },
  resultItem: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "5px",
  },
  formSection: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    maxWidth: "600px",
    margin: "0 auto",
  },
};

export default App;
