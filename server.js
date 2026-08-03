const express = require("express");
const cors = require("cors");

const produtoRoute = require("./routes/produto");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    mensagem: "API Mercado Livre funcionando!"
  });
});

app.use("/produto", produtoRoute);

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
