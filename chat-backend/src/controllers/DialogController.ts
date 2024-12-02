import express from 'express';
import { DialogModel, UserModel, MessageModel } from '../models';
import { IUser } from '../models/User';
import {  Server as SocketServer } from 'socket.io';

class DialogController {
    io: SocketServer;

    constructor(io: SocketServer) {
        this.io = io;
    }

    index = async (req: express.Request, res: express.Response) => {
        try {
            const userAuthenticated = req.user as IUser;
            const userId: string = userAuthenticated._id;
    
            const dialogs = await DialogModel.find()
                .or([{ author: userId }, { partner: userId }])
                .populate(['author', 'partner'])
                .populate({
                    path: 'lastMessage',
                })
                .exec();
    
            if (!dialogs || dialogs.length === 0) {
                return res.json({
                    message: 'Dialogs not found',
                });
            }
    
            return res.json(dialogs);
        } catch (error) {
            console.error('Error fetching dialogs:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    };


    findByAuthor = async (req: express.Request, res: express.Response) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        try {
            const userAuthenticated = req.user as IUser;
            const authorId: string = userAuthenticated._id;
            //console.log(userAuthenticated._id);

            const dialogs = await DialogModel.find({ author: authorId }).populate('author').populate('partner');
            if (!dialogs || dialogs.length === 0) {
                return res.status(404).json({
                    message: 'Dialogs no encontrados'
                });
            }
            res.json(dialogs);
        } catch (error) {
            res.status(404).json({ message: 'Identificador incorrecto' });
        }
    }

    create = async (req: express.Request, res: express.Response) => {
        try {
            const authorId: string = req.body.author;
            const partnerId: string = req.body.partner;
            const text: string = req.body.text;
    
            // Encontrar si diálogo existe
            const existingDialog = await DialogModel.findOne({
                $or: [
                    { author: authorId, partner: partnerId },
                    { author: partnerId, partner: authorId }
                ]
            });
            
            const user = await UserModel.findById(authorId);

            if (existingDialog) {
                // Si existe el diálogo, enviar mensaje 
                const newMessage = new MessageModel({
                    text: text,
                    user: user,
                    dialog: existingDialog._id
                });
    
                await newMessage.save().then(() => {
                    existingDialog.lastMessage = newMessage._id;
                    existingDialog.save().then(() => {
                        res.json(existingDialog);
                        this.io.emit("SERVER:DIALOG_CREATED", {
                            dialog: existingDialog
                        });
                    });
                })

                //console.log(newMessage);
                this.io.emit('SERVER:NEW_MESSAGE', newMessage);
            } else {
                // Si diálogo no existe, no enviar mensaje
                const dialog = new DialogModel({ author: authorId, partner: partnerId });
                const savedDialog = await dialog.save();
                
                const newMessage = new MessageModel({
                    text: text,
                    user: authorId,
                    dialog: savedDialog._id
                });
    
                await newMessage.save().then(() => {
                    savedDialog.lastMessage = newMessage._id;
                    savedDialog.save().then(() => {
                        res.json(savedDialog);
                        this.io.emit("SERVER:DIALOG_CREATED", {
                            dialog: savedDialog
                        });
                    });
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    

    delete = async (req: express.Request, res: express.Response) => {
        try {
            const id: string = req.params.id;
            const dialog = await DialogModel.findByIdAndDelete(id);
            if (!dialog) {
                return res.status(404).json({
                    message: 'No encontrado'
                });
            }
            res.status(200).json({
                message: "Dialog eliminado",
                eliminatedDialog: dialog,
            });
        } catch (error) {
            res.status(404).json({ message: 'Identificador incorrecto' });
        }
    }
}

export default DialogController;