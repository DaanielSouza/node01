const app = require("./config/expres")();

require("./config/database");

app.listen(app.get("port"),()=>{
  console.log("Servidor rodando!");
})