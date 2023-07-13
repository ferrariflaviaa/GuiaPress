const express = require("express")
const app = express();
const connection = require("./database/database")

//View engine
app.set("view engine", "ejs");

//Static
app.use(express.static('public'));

//Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
})

//Database
connection.authenticate().then(() => {
  console.log("Conexão feita com sucesso");
}).catch((error) => {
  console.log(error)
})

app.listen(8080, () => {
  console.log("O servidor está rodando")
})