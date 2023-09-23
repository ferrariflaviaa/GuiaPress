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
module.exports = router;