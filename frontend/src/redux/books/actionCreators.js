import * as actionTypes from "./actionTypes";

export const addBook = (newBook) => {
  // возвращает Действие
  return {
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
};
