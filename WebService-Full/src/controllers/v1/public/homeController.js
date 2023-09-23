const path = require('path')
const fs = require('fs')
const Handlebars  = require("handlebars");

const getHomePage = (req, res) => {
  const templateStr = fs.readFileSync(path.join(process.cwd()+'/src/views/layouts/home.hbs')).toString('utf8');
  const styleStr = fs.readFileSync(path.join(process.cwd()+'/src/views/styles/homeStyle.css')).toString('utf8');

  const data = {
    title: "Home",
    title_page: "Bem-vindo à página de Daniel Layon",
    estilo: styleStr,
  };

  let template = Handlebars.compile(templateStr);
  res.end(template(data));
};

module.exports = {
  getHomePage,
};
