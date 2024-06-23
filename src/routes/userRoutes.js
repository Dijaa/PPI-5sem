import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', userController.create);
userRouter.post('/login', userController.login);

userRouter.use(authMiddleware);

userRouter.get('/', userController.list);
userRouter.get('/:id', userController.show);
userRouter.put('/:id', userController.update);
userRouter.delete('/:id', userController.delete);

export default userRouter;