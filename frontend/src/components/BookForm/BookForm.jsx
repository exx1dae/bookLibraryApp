import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, fetchBook } from "../../redux/slices/bookSlice";

import createBookWithId from "../../utils/createBookWithId";
import booksData from "../../data/books.json";
import "./BookForm.css";

const BookForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = {
        title,
        author,
      };
      dispatch(addBook(createBookWithId(book, "manual"))); // dispatch принимает аргумент - действие (объект с типом и payload)

      setTitle("");
      setAuthor("");
    }
  };

  const handleRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    dispatch(addBook(createBookWithId(randomBook, "random")));
  };

  const handleAddRandomBookViaApi = () => {
    dispatch(fetchBook());
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add book</button>
        <button type="button" onClick={handleRandomBook}>
          Add random book
        </button>
        <button type="button" onClick={handleAddRandomBookViaApi}>
          Add random via API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
