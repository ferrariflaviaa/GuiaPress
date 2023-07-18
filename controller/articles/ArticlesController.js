const express = require("express");
const router = express.Router();
const Category = require("../../model/categories/category")
const Article = require("../../model/articles/Article")
const slugify = require("slugify")


router.get("/admin/articles", (req, res) => {
  Article.findAll().then(articles => {
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
module.exports = router;