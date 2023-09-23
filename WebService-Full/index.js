require("@babel/register");
const express = require("express");
const exphbs = require("express-handlebars").engine;
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./src/swaggerConfig");
const path = require("path");
const fs = require("fs");

// Configuração de Variaveis de Ambiente
dotenv.config();
const app = express();

// Configuração do Handlebars como mecanismo de visualização
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "src/views/layouts"),
    defaultLayout: "home", // Nome do layout padrão
  })
);
app.set("views", path.join(__dirname + `/src/views`));
app.set("view engine", "hbs");

// Configuração body parser para que entenda JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
app.use(
  morgan("combined", {
    stream: fs.createWriteStream(path.join(logDirectory, "access.log"), {
      flags: "a",
    }),
  })
);

// Configurar rotas
const authRouter = require(`./src/routes/${process.env.VERSAO_ROTAS}/auth/auth`);
const publicRouter = require(`./src/routes/${process.env.VERSAO_ROTAS}/public/public`);
const homeRouter = require(`./src/routes/${process.env.VERSAO_ROTAS}/public/home`);
const serverRouter = require(`./src/routes/${process.env.VERSAO_ROTAS}/server/server`);
const onixCameras = require(`./src/routes/${process.env.VERSAO_ROTAS}/server/onixCameras`);

app.use("/public", publicRouter);
app.use("/public", homeRouter);
app.use("/auth", authRouter);
app.use("/server", serverRouter);
app.use("/server", onixCameras);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
