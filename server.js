const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const port = 5000;

// Enable CORS for frontend interaction
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Create and connect to SQLite database (books.db in the root of the project)
const db = new sqlite3.Database("./books.db", (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Database connected successfully!");
    // Create tables if they don't exist
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS Authors (
        AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS Genres (
        GenreID INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL,
        Description TEXT
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS Books (
        BookID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT NOT NULL,
        AuthorID INTEGER NOT NULL,
        GenreID INTEGER NOT NULL,
        Pages INTEGER,
        PublishedDate TEXT,
        FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
        FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
      )`);
    });
  }
});

// Endpoint to get all books
app.get("/books", (req, res) => {
  const query = `
    SELECT b.BookID, b.Title, a.Name AS Author, g.Name AS Genre, b.Pages, b.PublishedDate
    FROM Books b
    JOIN Authors a ON b.AuthorID = a.AuthorID
    JOIN Genres g ON b.GenreID = g.GenreID
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint to add a new book
app.post("/books", (req, res) => {
  const { title, authorID, genreID, pages, publishedDate } = req.body;

  const query = `
    INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [title, authorID, genreID, pages, publishedDate],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res
        .status(201)
        .json({ message: "Book added successfully", BookID: this.lastID });
    }
  );
});

// Endpoint to update a book
app.put("/books/:id", (req, res) => {
  const { title, authorID, genreID, pages, publishedDate } = req.body;
  const bookID = req.params.id;

  const query = `
    UPDATE Books
    SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ?
    WHERE BookID = ?
  `;

  db.run(
    query,
    [title, authorID, genreID, pages, publishedDate, bookID],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Book updated successfully" });
    }
  );
});

// Endpoint to delete a book
app.delete("/books/:id", (req, res) => {
  const bookID = req.params.id;

  const query = `DELETE FROM Books WHERE BookID = ?`;

  db.run(query, [bookID], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Book deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
