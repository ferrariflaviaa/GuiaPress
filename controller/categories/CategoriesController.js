const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("Rota de categoria")
})

router.get("/admin/categories/new", (req, res) => {
  res.send("rota para criar uma nova categoria")
})

module.exports = router;