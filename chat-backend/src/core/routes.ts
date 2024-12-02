import express from 'express';
import { Server } from 'socket.io';

import bodyParser from 'body-parser'; 
import { updateLastSeen, checkAuth } from '../middlewares';

//import { loginValidation, registerValidation } from "../utils/validations";

import { 
    UserCtrl, 
    DialogCtrl, 
    MessageCtrl 
} from '../controllers';

const createRoutes = (app: express.Express, io: Server) => {
    
    const UserController = new UserCtrl(io);
    const DialogController = new DialogCtrl(io);
    const MessageController = new MessageCtrl(io);
    
    app.use(bodyParser.json());
    app.use(checkAuth);
    app.use(updateLastSeen);

    app.get("/", (_: express.Request, res: express.Response) => {
        res.send("Hello, World!");
    });

    // User CRUD
    app.get('/user/me', UserController.getMe);
    app.get('/user/find', UserController.findUsers);
    app.get('/user/:id', UserController.show);
    app.delete('/user/:id', UserController.delete);
    app.post('/user/registration', UserController.create);
    app.post('/user/login', UserController.login);
    app.post('/user/verify', UserController.verify); // No está dessarrollado en front, pero se puede desarrollar

    // Dialogs CRUD
    //app.get('/dialogs/:id', DialogController.findByAuthor);
    app.get('/dialogs', DialogController.index);
    app.delete('/dialogs/:id', DialogController.delete);
    app.post('/dialogs', DialogController.create);

    // Messages CRUD
    app.get('/messages/:id/:userId', MessageController.index);
    app.post('/messages', MessageController.create);
    app.delete('/messages/:id', MessageController.delete);
}

export default createRoutes;