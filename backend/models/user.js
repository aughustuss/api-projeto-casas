const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Preencha o email."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email inválido. ",
    ],
  },
  name: {
    type: String,
    required: [true, "Preencha o nome de usuário"],
  },
  password: {
    type: String,
    required: [true, "Informe uma senha."],
    select: false,
  },
});

const User = models.User || model("User", userSchema);
module.exports = User;