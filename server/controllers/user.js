const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const modelUser = mongoose.model("User");

const userController = {
  allUsers(req, res) {
    modelUser.find()
      .then(results => res.json(results))
      .catch(err => res.send(err));
  },
  newUser(req, res) {
    if (req.body.username && req.body.password) {
      if (req.body.password2 && req.body.password == req.body.password2) {
        modelUser.findOne({ 'username': req.body.username })
          .then(user => {
            if (user) {
              res.json({ success: false, message: "Usuário ou E-mail indisponível!", statusCode: 400 });
            } else {
              bcrypt.hash(req.body.password, 10)
                .then(hash => {
                  let encryptedPassword = hash;

                  let newUser = new modelUser({
                    username: req.body.username,
                    password: encryptedPassword,
                    email: req.body.email,
                    isAdmin: req.body.isAdmin
                  });

                  newUser.save()
                    .then(() => res.json({ success: true, message: "Usuário criado com sucesso!", statusCode: 201 }))
                    .catch(err => res.json({ success: false, message: err, statusCode: 500 }))
                })
            };
          });
      } else {
        res.json({ success: false, message: "Confirme suas senhas!", statusCode: 400 });
      }
    } else {
      res.json({ success: false, message: "Preencha os campos usuário e senha!", statusCode: 400 });
    };
  }
}

module.exports = userController;
