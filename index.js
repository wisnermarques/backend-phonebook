const express = require("express");
const cors = require('cors');

const PersonsRoutes = require("./routes/PersonsRoutes");

const app = express();

app.use(cors())

app.use(express.json());

app.get("/", (request, response) => {
  response.send("<h1>Seja bem vindo!</h1>");
});

app.use("/api/persons", PersonsRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
