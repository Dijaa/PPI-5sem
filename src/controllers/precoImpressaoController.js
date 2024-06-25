import PrecoImpressao from "../models/precoImpressao";

const precoImpressaoController = {

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
            const precoImpressao = await PrecoImpressao.findOne({ where: { descricao: body.descricao } });
            if (precoImpressao) return res.status(400).send({ success: false, message: "Preço de impressão já cadastrado" });

            const { descricao, valor } = body;

            const newPrecoImpressao = await PrecoImpressao.create({ descricao, valor });

            return res.status(201).send({ success: true, message: "Preço de impressão cadastrado com sucesso", precoImpressao: newPrecoImpressao });
        }
        catch (error) {
            return res.status(500).send({ success: false, message: "Erro ao cadastrar preço de impressão", error: error });
        }
    }
};

export default precoImpressaoController;
