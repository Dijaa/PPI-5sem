import TaxaFixa from "../models/taxaFixaModel";

const taxaFixaController = {

    async create(req, res) {
        if (!req.body) return res.status(400).send({ success: false, message: "Dados não informados" });
        const body = req.body;
        let missingFields = [];
        if (!body.descricao)
            missingFields.push("descricao");
        if (!body.valor)
            missingFields.push("valor");
        if (missingFields.length)
            return res.status(400).send({ success: false, message: `Campos faltando: ${missingFields.join(", ")}` });
        try {
            const taxaFixa = await TaxaFixa.findOne({ where: { descricao: body.descricao } });
            if (taxaFixa) return res.status(400).send({ success: false, message: "Taxa fixa já cadastrada" });

            const { descricao, valor } = body;

            const newTaxaFixa = await TaxaFixa.create({ descricao, valor });

            return res.status(201).send({ success: true, message: "Taxa fixa cadastrada com sucesso", taxaFixa: newTaxaFixa });
        }
        catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao cadastrar taxa fixa", error: error });
        }
    }
};

export default taxaFixaController;