import express from "express";
import sequelize from './src/database/connection.js';
import userRoutes from "./src/routes/userRoutes.js";
import clienteRoutes from "./src/routes/clienteRoutes.js";
import taxaRoutes from "./src/routes/taxaRoutes.js";
import equipamentoRoutes from "./src/routes/equipamentoRoutes.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/clientes", clienteRoutes);
app.use("/taxas", taxaRoutes); 
app.use("/equipamentos", equipamentoRoutes);  

app.get("/", (req, res) => {
  res.send("Hello World");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch(error => {
  console.error('Erro ao sincronizar com o banco de dados:', error);
});

export default app;
