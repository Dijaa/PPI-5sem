import Taxa from "../models/taxaModel.js";

const taxaController = {

    async create(req, res) {
        if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
        const body = req.body;
        let missingFields = [];
        if (!body.name)
            missingFields.push("name");
        if (!body.taxa)
            missingFields.push("taxa");
        if (missingFields.length)
            return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
        try {
            const { name, taxa } = body;

            const newTaxa = Taxa.create({ name, taxa });

            return res.status(201).send({ success: true, message: "Taxa cadastrada com sucesso", taxa: newTaxa });
        }
        catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao cadastrar taxa", error: error });
        }
    },

    async list(req, res) {
        try {
            const taxas = Taxa.findAll();
            return res.status(200).send({ success: true, message: "Taxas encontradas", taxas: taxas });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao buscar taxas", error: error });
        }
    },

    async listById(req, res) {
        const id = req.params.id;
        try {
            const taxa = Taxa.findByPk(id);
            if (!taxa) return res.status(404).send({ success: false, message: "Taxa não encontrada" });
            return res.status(200).send({ success: true, message: "Taxa encontrada", taxa: taxa });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao buscar taxa", error: error });
        }
    },

    async update(req, res) {
        if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
        const body = req.body;
        let missingFields = [];
        if (!body.name)
            missingFields.push("name");
        if (!body.taxa)
            missingFields.push("taxa");
        if (missingFields.length)
            return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
        try {
            const id = req.params.id;
            const taxaFind = Taxa.findByPk(id);
            if (!taxaFind) return res.status(404).send({ success: false, message: "Taxa não encontrada" });

            const { name, taxa } = body;

            await Taxa.update({ name, taxa }, { where: { id } });

            return res.send({ success: true, message: "Taxa atualizada com sucesso" });
        } catch (error) {
            return res.status(400).send({ success: false, message: "Falha ao atualizar taxa", error });
        }
    },

    async delete(req, res) {
        const id = req.params.id;
        try {
            const taxa = Taxa.findByPk(id);
            if (!taxa) return res.status(400).send({ success: false, message: "Taxa não encontrada" });

            await Taxa.destroy({ where: { id } });

            return res.send({ success: true, message: "Taxa deletada com sucesso" });
        } catch (error) {
            return res.status(400).send({ success: false, message: "Falha ao deletar taxa", error });
        }
    }
};

export default taxaController;