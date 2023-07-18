const express = require("express")
const app = express();
const connection = require("./database/database")
const categoriesController = require("./controller/categories/CategoriesController")
const articlesController = require("./controller/articles/ArticlesController")
const Article = require("./model/articles/Article")
const Category = require("./model/categories/category")

//View engine
app.set("view engine", "ejs");

//Static
app.use(express.static('public'));

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  Article.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(articles => {
    res.render("index", { articles: articles });
  })
})


app.get("/:slug",(req, res) => {
    var slug = req.params.slug;
    Article.findOne({
          where: {
                slug: slug
            }
        }).then(article => {
              if(article != undefined){
                    Category.findAll().then(categories => {
                          res.render("article", {article: article, categories: categories});
                      });
                  }else{
          res.redirect("/");
      }
  }).catch( err => {
        res.redirect("/");
    });
  })
  
  //Database
  
  connection.authenticate().then(() => {
    console.log("Conexão feita com sucesso");
}).catch((error) => {
  console.log(error)
})

app.use("/", categoriesController)
app.use("/", articlesController)

app.listen(8080, () => {
  console.log("O servidor está rodando")
})