const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://root:SENHA@cluster0.swsnx.mongodb.net/visto");

mongoose.connection.on("connected", () => {
  console.log("Conectado com sucesso!");
});

mongoose.connection.on("error", (err) => {
  console.log("Erro de conexão:" + err);
});

mongoose.connection.on("disconnect", () => {
  console.log("Desconectado.");
});
