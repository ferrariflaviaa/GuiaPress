const express = require("express");
const router = express.Router();
const Category = require("../../model/categories/category")
const Article = require("../../model/articles/Article")
const slugify = require("slugify")


router.get("/articles", (req, res) => {
  res.send("Rota de artigos")
})

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/articles/new", { categories: categories })
  })
})

router.post("/article/save", (req, res)=> {
  const {title, body, category} = req.body;
  Article.create({
    title,
    slug: slugify(title),
    body,
    categoryId: category
  })
})
module.exports = router;