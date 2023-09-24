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
  let limit = 4
  Article.findAll({
    order: [
      ['id', 'DESC']
    ],
    limit
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render("index", {articles: articles, categories: categories})
    })
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
  

app.get('/category/:slug', (req, res) => {
  var slug = req.params.slug;
  Category.findOne({
      where: {
          slug: slug
      },
      include: [{
          model: Article,
          include: [{model: Category}],
        }] //Serve como um join para ligar category e article
  }).then(category => {
      if(category != undefined){
          Category.findAll().then(categories => {
              res.render('index', {articles: category.articles, categories: categories});
          });
      } else {
          res.redirect('/');
      }
  }).catch(error => {
      console.log('Ocorreu um erro: '+error)
      res.redirect('/');
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