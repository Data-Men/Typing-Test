const express = require("express");
const path = require("path");
const file = require('fs');

const port = 3000;
const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("html/main.htm", { root: __dirname });
});

app.get("/text", (req, res) => {
  const txtFiles = file.readdirSync('data')
  const index = Math.floor((Math.random() * (10 ** (txtFiles.length).toString().length)) % txtFiles.length)
  const fileName = txtFiles[index];
  const text = file.readFileSync('data/' + fileName, { root: __dirname });
  res.status(200).json({ 'readtext': text.toString() });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
