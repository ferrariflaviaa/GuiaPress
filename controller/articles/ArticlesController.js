const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.send("Rota de artigos")
})

router.get("/admin/categories/new", (req, res) => {
  res.send("rota para criar uma novo artigos")
})

module.exports = router;