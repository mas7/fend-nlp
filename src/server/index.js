const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
const FormData = require("form-data");
const fetch = require("node-fetch");
const res = require("express/lib/response");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

app.use(express.static("dist"));

console.log(`Your API key is ${process.env.API_KEY}`);

app.get("/", function (req, res) {
  // res.sendFile("dist/index.html");
  res.sendFile(path.resolve("dist/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log("FEND-NLP app listening on port 8081!");
});

app.post("/api", function (req, res) {
  const formdata = new FormData();
  formdata.append("key", process.env.API_KEY);
  formdata.append("url", req.body.url);
  formdata.append("lang", "en"); // 2-letter code, like en es fr ...

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const response = fetch(
    "https://api.meaningcloud.com/sentiment-2.1",
    requestOptions
  )
    .then((response) =>
      response.json().then((data) => ({
        status: data.status,
        body: data,
      }))
    )
    .then(({ status, body }) => res.send(body))
    .catch((error) => console.log("error", error));
});
