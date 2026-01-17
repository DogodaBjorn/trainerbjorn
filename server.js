const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Absolute pad naar /public
const publicPath = path.join(__dirname, "public");

// 1. Serve static files (CSS, JS, images, én directe .html toegang)
app.use(express.static(publicPath));

// 2. Extension-less routing: /trainingen → trainingen.html
app.get("/:page", (req, res, next) => {
  const page = req.params.page;
  const filePath = path.join(publicPath, `${page}.html`);

  res.sendFile(filePath, (err) => {
    if (err) {
      next(); // laat Express verder kijken (404)
    }
  });
});

// 3. Fallback 404 (optioneel maar netjes)
app.use((req, res) => {
  res.status(404).send("Pagina niet gevonden");
});

// 4. Start server
app.listen(port, () => {
  console.log(`TrainerBjorn running on port ${port}`);
});
