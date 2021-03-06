const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes');
const path = require("path")
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');


//Connexion à la base de donnée
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/react-gobelins', { useNewUrlParser: true }).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});
const app = express();

const port = process.env.PORT || 8081;

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.use(morgan('combined'));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
app.use(cors());
app.use(router)
    .listen(port, () => console.log('Example app listening on port ' + port));

module.exports = app;
