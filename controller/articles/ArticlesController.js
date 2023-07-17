const express = require("express");
const router = express.Router();
const Category = require("../../model/categories/category")

router.get("/articles", (req, res) => {
  res.send("Rota de artigos")
})

router.get("/admin/articles/new", (req, res) => {
  Category.findAll().then(categories => {
    res.render("admin/articles/new", { categories: categories })
  })
})

router.get
module.exports = router;