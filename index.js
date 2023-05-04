const express = require('express');
const connectToMongo = require("./backend/lib/mondodb")
const User = require('./backend/models/user');
const { hash } = require('bcryptjs');

const app = express();
app.use(express.json());
const PORT = 8000;
const HOST = 'localhost'; 

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
app.post('/register', async (req, res) => {
  try {
    await connectToMongo();
    if (!req.body) {
      return res.status(400).json({ error: 'Preencha os campos. ' });
    }

    const { email, name, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: 'Email já está em uso.' });
    } else {
      if (password && password.length < 4) {
        return res.status(409).json({ error: 'Senha deve conter 4 caracteres ou mais. ' });
      }

      const hashedPassword = await hash(password, 12);
      const newUser = new User({
        email,
        name,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      const user = {
        id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
      };

      return res.status(201).json({ success: true, user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Falha interna no servidor.' });
  }
});

app.use((req, res, next) => {
  res.status(405).json({ error: 'Método não permitido. ' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Falha interna no servidor.' });
});

module.exports = app;