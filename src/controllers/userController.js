import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const auth = process.env.SECRET;

import User from "../models/userModel.js";

(async () => {
  try {
    await User.sync({ alter: true });
    console.log('Tabela "users" sincronizada com sucesso.');
  } catch (error) {
    console.error('Erro durante a sincronização da tabela "users":', error);
  }
})();

User.findOne({ where: { email: "admin" } }).then((user) => {
  if (!user) {
    User.create({
      name: "admin",
      email: "admin",
      password: "admin",
      admin: true
    })
  }
});



const generateToken = (params = {}) => {
  return jwt.sign(params, auth, {
    expiresIn: 7776000,
  });
}


const userController = {

  async create(req, res) {
    if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
    const body = req.body;
    let missingFields = [];
    if (!body.name)
      missingFields.push("name");
    if (!body.email)
      missingFields.push("email");
    if (!body.password)
      missingFields.push("password");
    if (missingFields.length)
      return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
    try {
      console.log(body.email);
      const user = await User.findOne({ where: { email: body.email } });
      console.log(user);
      if (user) return res.status(400).send({ success: false, message: "Email já cadastrado" });

      const { name, email, password } = body;
      const admin = body.admin || false;

      const neuUser = await User.create({ name, email, password, admin });
      neuUser.password = undefined;

      return res.status(201).send({ neuUser, token: generateToken({ id: neuUser.id }), success: true, message: "Usuário criado com sucesso" });
    } catch (error) {
      return res.status(400).send({ success: false, message: "Falha ao criar usuário", error });
    }
  },

  async login(req, res) {
    if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
    const body = req.body;
    let missingFields = [];
    if (!body.email)
      missingFields.push("email");
    if (!body.password)
      missingFields.push("password");
    if (missingFields.length)
      return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
    try {
      const user = await User.findOne({ where: { email: body.email } });
      if (!user) return res.status(400).send({ success: false, message: "Usuário não encontrado" });

      if (!await bcrypt.compare(body.password, user.password))
        return res.status(400).send({ success: false, message: "Senha inválida" });

      user.password = undefined;

      return res.send({ user, token: generateToken({ id: user.id }), success: true, message: "Usuário logado com sucesso" });
    } catch (error) {
      return res.status(400).send({ success: false, message: "Falha ao logar", error });
    }
  },

  async update(req, res) {
    let id = req.params.id;
    if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
    const body = req.body;
    console.log(body);
    let missingFields = [];
    if (!body.name) missingFields.push("name");
    if (!body.email) missingFields.push("email");
    if(body.status == undefined) missingFields.push("status");


    // if (!body.password) missingFields.push("password");
    if (missingFields.length) return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
    try {
      const user = await User.findByPk(id);
      if (!user) return res.status(400).send({ success: false, message: "Usuário não encontrado" });

      const name = body.name || user.name;
      const email = body.email || user.email;
      // const password = body.password || user.password;
      const admin = body.admin || user.admin;
      const status = body.status

      await User.update({ name, email, admin, status }, { where: { id } });

      user.password = undefined;

      return res.send({ user, success: true, message: "Usuário atualizado com sucesso" });
    } catch (error) {
      return res.status(400).send({ success: false, message: "Falha ao atualizar usuário", error });
    }
  },

  async delete(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findByPk(id);
      if (!user) return res.status(400).send({ success: false, message: "Usuário não encontrado" });

      await User.destroy({ where: { id } });

      return res.send({ success: true, message: "Usuário deletado com sucesso" });
    } catch (error) {
      return res.status(400).send({ success: false, message: "Falha ao deletar usuário", error });
    }
  },

  async list(req, res) {
    try {
      const users = await User.findAll();
      users.map(user => user.password = undefined);

      return res.send({ users, success: true, message: "Usuários listados com sucesso" });
    } catch (error) {
      return res.status(400).send({ success: false, message: "Falha ao listar usuários", error });
    }
  },

  async show(req, res) {
    const id = req.params.id;

    try {
      const user = await User.findByPk(id);
      if (!user) return res.status(400).send({ success: false, message: "Usuário não encontrado" });

      user.password = undefined;

      return res.send({ user, success: true, message: "Usuário encontrado com sucesso" });
    } catch (error) {
      return res.status(400).send({ success: false, message: "Falha ao encontrar usuário", error });
    }
  }
};

export default userController;