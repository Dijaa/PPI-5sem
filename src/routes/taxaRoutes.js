import express from 'express';
import taxaController from '../controllers/taxaController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const taxaRouter = express.Router();

taxaRouter.use(authMiddleware);

taxaRouter.get('/', taxaController.list);
taxaRouter.get('/:id', taxaController.listById);
taxaRouter.post('/', taxaController.create);
taxaRouter.put('/:id', taxaController.update);
taxaRouter.delete('/:id', taxaController.delete);

export default taxaRouter;