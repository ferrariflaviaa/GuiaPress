const express = require("express");
const bcrypt = require("bcryptjs")
const router = express.Router();
const User = require("./../../model/users/users")
const {adminAuth,adminNotAuth} = require("../../middleware/adminAuth")

router.get("/admin/users", adminAuth,(req, res) => {
  User.findAll().then(users => {
    res.render("admin/users/index", { users: users })
  })
})

router.get("/admin/users/create", adminAuth,(req, res) => {
  res.render("admin/users/create")
})

router.post("/users/create", adminAuth,(req, res) => {
  let { email, password } = req.body

  User.findOne({ where: { email: email } }).then(user => {
    if (user == undefined) {
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)

      User.create({
        email,
        password: hash
      }).then(() => {
        res.redirect("/")
      })
    } else {
      res.redirect("/admin/users/create")
    }
  })
})

router.get("/admin/login",adminNotAuth,(req, res) => {
  res.render("admin/users/login")
})

router.post("/authenticate", (req, res) => {
  let { email, password } = req.body

  User.findOne({ where: { email } }).then(user => {
    if (user != undefined) {
      let correct = bcrypt.compareSync(password, user.password);

      if (correct) {
        req.session.user = {
          id: user.id,
          email: user.email
        }
        res.redirect("/admin/articles")
      } else {
        res.redirect("/admin/login")
      }
    } else {
      res.redirect("/admin/login")
    }
  })
})

router.get("/logout", (req, res) => {
  req.session.user = undefined;
  res.redirect("/")
})
module.exports = router;