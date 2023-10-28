import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import {
  selectAuthorFilter,
  selectFavoriteFilter,
  selectTitleFilter,
} from "../../redux/slices/filterSlice";

import {
  deleteBook,
  toggleFavorite,
  selectBooks,
} from "../../redux/slices/bookSlice";

import "./BookList.css";

const BookList = () => {
  const books = useSelector(selectBooks);
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const favoriteFilter = useSelector(selectFavoriteFilter);
  const dispatch = useDispatch();

  const handleDeleteBook = (bookID) => {
    dispatch(deleteBook(bookID));
  };

  const handleToggleFavorite = (bookId) => {
    dispatch(toggleFavorite(bookId));
  };

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = favoriteFilter ? book.isFavorite : true;

    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");
    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>BookList</h2>
      {filteredBooks.length === 0 ? (
        <h2>Books not found</h2>
      ) : (
        <ul>
          {filteredBooks.map((book, index) => (
            <li key={book.id}>
              <div className="book-info">
                {++index}. {highlightMatch(book.title, titleFilter)} by{" "}
                <strong>{highlightMatch(book.author, authorFilter)}</strong> (
                {book.source})
              </div>
              <div className="book-actions">
                {book.isFavorite ? (
                  <BsBookmarkStarFill
                    className="star-icon"
                    onClick={() => handleToggleFavorite(book.id)}
                  />
                ) : (
                  <BsBookmarkStar
                    className="star-icon"
                    onClick={() => handleToggleFavorite(book.id)}
                  />
                )}
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
