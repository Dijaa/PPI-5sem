import express from 'express';
import equipamentoController from '../controllers/equipamentoController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const equipamentoRouter = express.Router();

equipamentoRouter.use(authMiddleware);

equipamentoRouter.get('/', equipamentoController.list);
equipamentoRouter.get('/:id', equipamentoController.listById);
equipamentoRouter.post('/', equipamentoController.create);
equipamentoRouter.put('/:id', equipamentoController.update);
equipamentoRouter.delete('/:id', equipamentoController.delete);

export default equipamentoRouter;