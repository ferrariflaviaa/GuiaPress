const express = require("express");
const router = express.Router();
const Category = require("../../model/categories/category")
const Article = require("../../model/articles/Article")
const slugify = require("slugify")


router.get("/admin/articles", (req, res) => {
  Article.findAll({
    include: [{ model: Category }]
  }).then(articles => {
    res.render("admin/articles/index", { articles: articles });
  })
})

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/articles/new", { categories: categories })
  })
})

router.post("/articles/save", (req, res) => {
  const { title, body, category } = req.body;

  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: category
  }).then(() => {
    res.redirect("/admin/articles")
  })
})

router.post("/articles/delete", (req, res) => {
  const { id } = req.body;
  if (id != undefined) {
    if (!isNaN(id)) {
      Article.destroy({
        where: {
          id: id
        }
      }).then(() => {
        res.redirect("/admin/articles")
      })
    } else { //NÃO FOR NÚMERO
      res.redirect("/admin/articles")
    }
  } else { // NULL
    res.redirect("/admin/articles")
  }
})

router.get("/admin/articles/edit/:id", (req, res) => {
  var id = req.params.id;

  Article.findByPk(id).then(article => {
    if (article != undefined) {

      Category.findAll().then(categories => {
        res.render("admin/articles/edit", { categories: categories, article: article })
      })

    } else {
      res.redirect("/admin/articles")
    }
  }).catch(erro => {
    res.redirect("/admin/articles")
  })
})

router.post("/articles/update", (req, res) => {
  const { title, body, category, id } = req.body;

  Article.update({
    title,
    slug: slugify(title),
    body,
    categoryId: category
  }, {
    where: {
      id: id
    }
  }).then(() => {
    res.redirect("/admin/articles")
  }).catch(() => {
    res.redirect("/")
  })

})

//Paginação
router.get("/articles/page/:num", (req, res) => {
  var page = req.params.num;
  var offset = 0;
  var limit = 4;

  if (isNaN(page) || page == 1) {
    offset = 0;
  } else if (page == 2) {
    offset = 1 * parseInt(limit); //Converte para número e multiplica 
  } else {
    offset = parseInt(page) * parseInt(limit) - parseInt(limit); //Converte para número e multiplica pela qtd de itens na página
  }

  //Retorna tudo e a quantidade 
  Article.findAndCountAll({
    limit: limit,
    offset: offset ,//Onde inicia - começa no zero - Foi passada a variável offset
    order: [
      ['id', 'DESC']
    ],
  }).then(articles => {

    //Verificar se tem próxima página
    var next;
    if (offset + parseInt(limit) >= articles.count) {
      next = false;
    } else {
      next = true;
    }

    var result = {
      next: next,
      page: page,
      offset: offset,
      articles: articles
    }

    Category.findAll().then(categories => {
      res.render("admin/articles/pages", { result: result, categories: categories })
    })
  })

});
module.exports = router;