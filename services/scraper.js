const { chromium } = require("playwright");

async function buscarProdutos(termo) {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(
    `https://lista.mercadolivre.com.br/${encodeURIComponent(termo)}`,
    {
      waitUntil: "domcontentloaded",
      timeout: 60000
    }
  );

  const produtos = await page.evaluate(() => {
    return [...document.querySelectorAll(".ui-search-result")].slice(0, 10).map(item => ({
      titulo:
        item.querySelector(".poly-component__title")?.innerText || "",
      preco:
        item.querySelector(".andes-money-amount__fraction")?.innerText || "",
      link:
        item.querySelector("a")?.href || "",
      imagem:
        item.querySelector("img")?.src || ""
    }));
  });

  await browser.close();

  return produtos;
}

module.exports = {
  buscarProdutos
};
