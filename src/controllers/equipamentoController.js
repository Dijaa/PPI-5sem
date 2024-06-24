import Equipamento from "../models/equipamentoModel.js";

const equipamentoController = {

    async create(req, res) {
        if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
        const body = req.body;
        let missingFields = [];
        if (!body.modelo)
            missingFields.push("modelo");
        if (!body.velocidade_copia)
            missingFields.push("velocidade_copia");
        if (!body.resolucao)
            missingFields.push("resolucao");
        if (!body.capacidade_de_memoria)
            missingFields.push("capacidade_de_memoria");
        if (body.nfc === undefined)
            missingFields.push("nfc");
        if (!body.data_compra)
            missingFields.push("data_compra");
        if (missingFields.length)
            return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
        try {
            const { modelo, velocidade_copia, resolucao, capacidade_de_memoria, nfc, data_compra } = body;

            const newEquipamento = await Equipamento.create({ modelo, velocidade_copia, resolucao, capacidade_de_memoria, nfc, data_compra });
            
            return res.status(201).send({ success: true, message: "Equipamento cadastrado com sucesso", equipamento: newEquipamento });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao cadastrar equipamento", error: error });
        }
    },

    async list(req, res) {
console.log(req);
        try {
            const equipamentos = await Equipamento.findAll();
            console.log(equipamentos);
            return res.status(200).send({ success: true, message: "Equipamentos encontrados", equipamentos: equipamentos });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ success: false, message: "Erro ao buscar equipamentos", error: error });
        }
    },

    async listById(req, res) {
        const id = req.params.id;
        try {
            const equipamento = Equipamento.findByPk(id);
            if (!equipamento) return res.status(404).send({ success: false, message: "Equipamento não encontrado" });
            return res.status(200).send({ success: true, message: "Equipamento encontrado", equipamento: equipamento });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao buscar equipamento", error: error });
        }
    },

    async update(req, res) {
        if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
        const body = req.body;
        let missingFields = [];
        if (!body.modelo)
            missingFields.push("modelo");
        if (!body.velocidade_copia)
            missingFields.push("velocidade_copia");
        if (!body.resolucao)
            missingFields.push("resolucao");
        if (!body.capacidade_de_memoria)
            missingFields.push("capacidade_de_memoria");
        if (!body.nfc)
            missingFields.push("nfc");
        if (!body.data_compra)
            missingFields.push("data_compra");
        if (missingFields.length)
            return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
        try {
            const id = req.params.id;
            const equipamentoFind = Equipamento.findByPk(id);
            if (!equipamentoFind) return res.status(404).send({ success: false, message: "Equipamento não encontrado" });

            const { modelo, velocidade_copia, resolucao, capacidade_de_memoria, nfc, data_compra } = body;

            await Equipamento.update({ modelo, velocidade_copia, resolucao, capacidade_de_memoria, nfc, data_compra }, { where: { id } });

            return res.send({ success: true, message: "Equipamento atualizado com sucesso" });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao atualizar equipamento", error: error });
        }
    },

    async delete(req, res) {
        const id = req.params.id;

        try {
            const equipamento = Equipamento.findByPk(id);
            if (!equipamento) return res.status(404).send({ success: false, message: "Equipamento não encontrado" });

            await Equipamento.destroy({ where: { id } });

            return res.send({ success: true, message: "Equipamento deletado com sucesso" });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao deletar equipamento", error: error });
        }
    }

};

export default equipamentoController;