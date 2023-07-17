const express = require("express");
const slugify = require("slugify")
const router = express.Router();
const Category = require("./../../model/categories/category")

router.get("/admin/categories/new", (req, res) => {
  res.render("admin/categories/new")
})

router.post("/categories/save", (req, res) => {
  let title = req.body.title;
  if (title != undefined) {
    Category.create({
      title: title,
      slug: slugify(title)
    }).then(() => {
      res.redirect("/")
    })
  } else {
    res.redirect("/admin/categories/new");
  }
})

router.get("/admin/categories", (req, res)=> {
  res.render("admin/categories/index")
})


module.exports = router;