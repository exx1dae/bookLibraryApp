import * as actionTypes from "./actionTypes";

export const addBook = (newBook) => {
  // возвращает Действие
  return {
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
};

export const deleteBook = (bookID) => {
  return {
    type: actionTypes.DELETE_BOOK,
    payload: bookID,
  };
};
