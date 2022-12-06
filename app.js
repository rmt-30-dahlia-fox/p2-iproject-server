const express = require("express");
const app = express();
const router = require("./routes");
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
