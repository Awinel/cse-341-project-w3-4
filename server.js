const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

const mongodb = require("./data/database");
const app = express();

app.use(bodyParser.json());
app.use("/", require("./routes"));

mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    } else {
        app.listen (port, () => {console.log(`Database is listening and node running on port ${port}`)});
    }
});