const express = require("express");
const bcrypt = require("bcryptjs")
const router = express.Router();
const User = require("./../../model/users/users")

router.get("/admin/users", (req, res) => {
  User.findAll().then(users => {
    res.render("admin/users/index",{users: users})
  })
})

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create")
})

router.post("/users/create", (req, res) => {
  let { email, password } = req.body
  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(password, salt)

  User.create({
    email,
    password: hash
  }).then(() => {
    res.redirect("/")
  })

})
module.exports = router;