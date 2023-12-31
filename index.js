const express = require("express")
const app = express();
const connection = require("./database/database")
const categoriesController = require("./controller/categories/CategoriesController")
const articlesController = require("./controller/articles/ArticlesController")
const userController = require("./controller/users/userController")
const Article = require("./model/articles/Article")
const Category = require("./model/categories/category")
const User = require("./model/users/users")
const session = require("express-session")

//View engine
app.set("view engine", "ejs");




//Sessions
app.use(session({
  secret: "qualquercoisa", cookie: {maxAge: 14400000000}
}))

//Static
app.use(express.static('public'));

//Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", categoriesController)
app.use("/", articlesController)
app.use("/", userController)

app.get("/", (req, res) => {
  let limit = 10
  Article.findAll({
    order: [
      ['id', 'DESC']
    ],    
    include: [{
      model: Category,
      include: [{model: Article}],
    }] ,
    limit
  }).then(articles => {
    Category.findAll().then(categories => {
      res.render("index", {articles: articles, categories: categories, user: req.session.user})
    })
  })
})


app.get("/:slug",(req, res) => {
    var slug = req.params.slug;
    Article.findOne({
          where: {
                slug: slug
            },
        }).then(article => {
              if(article != undefined){
                    Category.findAll().then(categories => {
                          res.render("article", {article: article, categories: categories, user: req.session.user});
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
              res.render('index', {articles: category.articles, categories: categories, user: req.session.user})
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



app.listen(8080, () => {
  console.log("O servidor está rodando")
})