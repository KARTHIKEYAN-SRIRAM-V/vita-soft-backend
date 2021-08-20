const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("./jwt");
const Mysql = require("mysql");

const app = express();
app.use(bodyParser.json());
const port = 3000;

const mysqlcon = Mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "vitasoft",
  multipleStatements: true,
});

mysqlcon.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Not Connected");
  }
});

app.get("/", (req, res) => {
  res.sendFile("D:/DEVELOPMENT/vita-soft-backend/form.html");
});

app.get("/css/appp.css", (req, res) => {
  res.sendFile("D:/DEVELOPMENT/vita-soft-backend/css/appp.css");
});

app.get("/css/form.css", (req, res) => {
  res.sendFile("D:/DEVELOPMENT/vita-soft-backend/css/form.css");
});

app.get("/js/app.js", (req, res) => {
  res.sendFile("D:/DEVELOPMENT/vita-soft-backend/js/app.js");
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username == "admin" && password == "mypassword") {
    const token = jwt(username);
    return res.json({ success: true, token });
  }
  return res.sendStatus(401);
});

app.delete("/form/delete-details/:id", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username == "admin" && password == "mypassword") {
    const token = jwt(username);
    return res.json({ success: true, token });
  }
  return res.sendStatus(401);
});

app.post("/form/save-details", (req, res) => {
  try {
    var sql = "insert into vitasoftdb SET?";

    var sql1 = "select * from vitasoftdb";

    const userdetails = req.body;

    if (userdetails) {
      mysqlcon.query(sql, userdetails, function (err, data) {
        if (err) throw err;
        console.log("User dat is inserted successfully ");
      });

      mysqlcon.query(sql1, userdetails, function (err, data) {
        if (err) throw err;
        console.log("User dat is inserted successfully ");
        res.json(data);
      });
    }
  } catch (error) {
    console.log("Error ");
  }
});

app.get("/user/list", (req, res) => {
  try {
    var sql1 =
      "select id,firstname,middlename,lastname,address,country,state,zipcode,email,phonenumber,height,weight from vitasoftdb ";

    mysqlcon.query(sql1, function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/user/:id", (req, res) => {
  try {
    const id = req.params.id;
    var sql1 = "delete from vitasoftdb where ?";

    mysqlcon.query(sql1, { id }, function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
