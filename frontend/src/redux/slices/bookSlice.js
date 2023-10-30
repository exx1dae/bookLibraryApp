import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithId from "../../utils/createBookWithId";

const initialState = [];

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      return state.map((book) =>
        book.id === action.payload
          ? { ...book, isFavorite: !book.isFavorite }
          : book,
      );
      // так тоже можно
      /*
        state.forEach((book) => {
          if (book.id === action.payload) {
            book.isFavorite = !book.isFavorite;
          }
        })
       */
    },
  },
});

export const thunkFunction = async (dispatch, getState) => {
  // async action
  try {
    const res = await axios.get("http://localhost:4000/random-book");
    if (res.data && res.data.title && res.data.author) {
      dispatch(addBook(createBookWithId(res.data, "API")));
    }
  } catch (e) {
    console.log("Error fetching book", e);
  }
};

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;

export const selectBooks = (state) => state.books;

export default bookSlice.reducer;
