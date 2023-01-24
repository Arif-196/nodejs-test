const express = require("express");
const PORT = process.env.PORT || 7070;
const app = express();

//express middleware

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
