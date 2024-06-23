import Cliente from "../models/clienteModel.js";

const clienteController = {
    async create(req, res) {
        if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
        const body = req.body;
        let missingFields = [];
        if (!body.name)
            missingFields.push("name");
        if (!body.company)
            missingFields.push("company");
        if (!body.email)
            missingFields.push("email");
        if (!body.phone)
            missingFields.push("phone");
        if (missingFields.length)
            return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
        try {
            const cliente = await Cliente.findOne({ where: { email: body.email } });
            if (cliente) return res.status(400).send({ success: false, message: "Email já cadastrado" });

            const { name, company, email, phone } = body;

            const newCliente = await Cliente.create({ name, company, email, phone });

            return res.status(201).send({ success: true, message: "Cliente cadastrado com sucesso", cliente: newCliente });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao cadastrar cliente", error: error });
        }
    },
    async read(req, res) {
        try {
            const clientes = await Cliente.findAll();
            return res.status(200).send({ success: true, message: "Clientes encontrados", clientes: clientes });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao buscar clientes", error: error });
        }
    },
    async readById(req, res) {
        const id = req.params.id;
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) return res.status(404).send({ success: false, message: "Cliente não encontrado" });
            return res.status(200).send({ success: true, message: "Cliente encontrado", cliente: cliente });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao buscar cliente", error: error });
        }
    },
    async update(req, res) {
        if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
        const body = req.body;
        let missingFields = [];
        if (!body.name)
            missingFields.push("name");
        if (!body.company)
            missingFields.push("company");
        if (!body.email)
            missingFields.push("email");
        if (!body.phone)
            missingFields.push("phone");
        if (missingFields.length)
            return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
        try {
            const id = req.params.id;
            const cliente = await Cliente.findByPk(id);
            if (!cliente) return res.status(404).send({ success: false, message: "Cliente não encontrado" });

            const { name, company, email, phone } = body;

            await Cliente.update({ name, company, email, phone }, { where: { id } });

            return res.status(200).send({ success: true, message: "Cliente atualizado com sucesso" });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao atualizar cliente", error: error });
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) return res.status(404).send({ success: false, message: "Cliente não encontrado" });

            await Cliente.destroy({ where: { id } });

            return res.status(200).send({ success: true, message: "Cliente deletado com sucesso" });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao deletar cliente", error: error });
        }
    }
    
};

export default clienteController;