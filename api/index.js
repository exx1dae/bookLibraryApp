const express = require("express"); // импорт express
const cors = require("cors"); // импорт cors
const booksData = require("./data/books.json");

const app = express(); // создание приложения

app.use(cors()); // для предотвращения ошибок при взаимодействии с frontend

app.get("/random-book", (req, res) => {
  const randomIndex = Math.floor(Math.random() * booksData.length);
  const randomBook = booksData[randomIndex];

  res.json(randomBook); // отправление клиенту (frontend) json объект
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
