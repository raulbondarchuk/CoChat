import express from 'express';
import { DialogModel, MessageModel, UserModel } from '../models';
import { IUser } from '../models/User';

import {  Server as SocketServer } from 'socket.io';

class MessageController {
    io: SocketServer;

    constructor(io: SocketServer) {
        this.io = io;
    }

    index = async (req: express.Request, res: express.Response) => {
        try {
            const dialogId: string = req.params.id;
            const userId: string = req.params.userId;
            
            const messages = await MessageModel.find({ dialog: dialogId }).populate('user');;
            if (!messages) {
                return res.status(404).json({
                    message: 'Dialogs no encontrados'
                });
            }

            //console.log(messages);
            //console.log(userId);

            await this.updateMessagesReadStatus(messages, userId);

            res.json(messages);
        } catch (error) {
            res.status(404).json({ message: 'Identificador incorrecto' });
        }
    }

    create = async (req: express.Request, res: express.Response) => {
        try {
            const dialogId: string = req.body.dialog_id;
            const userAuthenticated = req.user as IUser;
            const userId: string = userAuthenticated._id;
    
            // obtener dialogo
            const dialog = await DialogModel.findById(dialogId);
            if (!dialog) {
                return res.status(404).json({ message: 'Dialog not found' });
            }
            
            const user = await UserModel.findById(userId);

            // crear message
            const postData = {
                text: req.body.text,
                user: user,
                dialog: dialogId, 
            };
            const message = new MessageModel(postData);
            const savedMessage = await message.save();
            
            // Modificar lastMessage 
            dialog.lastMessage = message._id;
            await dialog.save().then(() =>{
                this.io.emit("SERVER:DIALOG_CREATED", {
                    dialog: dialog
                });
            })
    
            // Notificacion de la modificaion dialogo
            //console.log(savedMessage);
            this.io.emit('SERVER:NEW_MESSAGE', savedMessage);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    

    delete = async (req: express.Request, res: express.Response) => {
        try {
            const id: string = req.params.id;
    
            // Encuentra el mensaje que  eliminamos y el diálogo al que pertenece
            const messageForElim = await MessageModel.findById(id);
            
            if (!messageForElim) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Mensaje no encontrado'
                });
            }
    
            const dialog = await DialogModel.findById(messageForElim.dialog);
    
            if (!dialog) {
                return res.status(404).json({
                    status: 'error',
                    message: 'Diálogo no encontrado'
                });
            }
    
            // Eliminar mensaje
            await messageForElim.deleteOne();
    
            // Encontrar el último mensaje de una conversación, sin incluir el mensaje que se está eliminando
            const lastMessage = await MessageModel.findOne({ dialog: dialog._id, _id: { $ne: id } })
                .sort({ createdAt: -1 })
                .exec();
    
            // modificar lastMessage
            dialog.lastMessage = lastMessage ? lastMessage._id : null;

            await dialog.save().then(() =>{
                this.io.emit("SERVER:DIALOG_CREATED", {
                    dialog: dialog
                });
            });
            
            //this.io.emit('SERVER:NEW_MESSAGE', dialog.lastMessage);
            this.io.emit('messageDeleted', dialog._id);

            res.status(200).json({
                status: 'success',
                message: `Mensaje eliminado`,
                eliminatedMessage: messageForElim,
            });
        } catch (error) {
            res.status(403).json({ message: 'Identificador incorrecto' });
        }
    }
    
    updateMessagesReadStatus = async (messages: any[], userId: string) => {
        try {
            for (const message of messages) {
    
                // console.log("Usuario autorizado: " + userId + " YYY mensaje de usuario: " + message.user._id)
    
                if (userId && message.user && message.user._id.toString() !== userId && !message.readed) {
                    // Read message
                    message.readed = true;
                    await message.save(); // Guardar cambios
                }
            }
            // this.io.emit('messageReaded', messages);

           // console.log('Status del mensaje fue cambiado (all unread to read)');
        } catch (error) {
            console.log('Error al cambiar status del mensaje');
        }
    };
}

export default MessageController;