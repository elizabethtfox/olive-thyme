//Dependencies
var express = require("express");
var bodyParser = require("body-parser");

//Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

//Requiring our models for syncing
var db = require("./models");

//Sets up the Express app to handle data parsing

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));
//parse application/json
app.use(bodyParser.json());

//Static directory
app.use(express.static("public"));

//Routes
require("./routing/api-routes.js")(app);
require("./routing/html-routes.js")(app);
require("./routing/post-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });


  //login route if password matches (for loop????)
  
  //login route if password matches (for loop????)
  //------------------------------------------------------------------------------------------------------------------------------//
  var objPeople = [
    {
      username: "elizabeth",
      password: "codify"
    },

    {
      username: "mariam",
      password: "academy"

    },

    {
      username: "catherine",
      password: "today"

    }
  ]

  function getInfo() {
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value

    for (i = 0; i < objPeople.length; i++) {
      if (username == objPeople[i].username && passWord == objPeople[i].passWord) {
        console.log(username + "is logged in!!")
        return
      }
    }
    console.log("incorrect username or password")

  }
  