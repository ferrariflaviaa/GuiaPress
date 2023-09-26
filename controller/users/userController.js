const express = require("express");
const bcrypt = require("bcryptjs")
const router = express.Router();
const User = require("./../../model/users/users")

router.get("/admin/users", (req, res) => {
  User.findAll().then(users => {
    res.render("admin/users/index", { users: users })
  })
})

router.get("/admin/users/create", (req, res) => {
  res.render("admin/users/create")
})

router.post("/users/create", (req, res) => {
  let { email, password } = req.body

  User.findOne({ where: { email: email } }).then(user => {
    console.log(user)
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

router.get("/admin/login", (req, res) => {
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
        res.json(req.session.user)
      } else {
        res.redirect("/admin/login")
      }
    } else {
      res.redirect("/admin/login")
    }
  })
})
module.exports = router;