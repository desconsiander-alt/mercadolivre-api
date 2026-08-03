const express = require("express");
const router = express.Router();

const { buscarProdutos } = require("../services/scraper");

router.get("/", async (req, res) => {
  try {
    const termo = req.query.q;

    if (!termo) {
      return res.status(400).json({
        erro: "Informe o parâmetro q."
      });
    }

    const produtos = await buscarProdutos(termo);

    res.json(produtos);

  } catch (erro) {
    console.error(erro);

    res.status(500).json({
      erro: "Erro ao buscar produtos."
    });
  }
});

module.exports = router;
