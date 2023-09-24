const express = require("express");
const slugify = require("slugify")
const router = express.Router();
const User = require("./../../model/users/users")

router.get("/admin/users", (req, res) => {
  res.send("Listagem de usuários")
})

router.get("/admin/users/create", (req,res) => {
  res.render("admin/users/create")
})
module.exports = router;