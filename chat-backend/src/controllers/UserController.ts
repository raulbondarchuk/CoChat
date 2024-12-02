import express from 'express';
import { UserModel } from '../models';
import { IUser } from '../models/User';
import { createJWTToken } from '../utils';

import {  Server as SocketServer } from 'socket.io';

import { validationResult } from 'express-validator';

import bcrypt from "bcrypt";


class UserController {
    io: SocketServer;

    constructor(io: SocketServer) {
        this.io = io;
    }


    verify = async (req: express.Request, res: express.Response) => {
        try {
            const hash = req.query.hash?.toString(); // ponemos hash como string 
    
            if (!hash) {
                return res.status(400).json({ message: 'Hash introducido no es correcto.' });
            }
    
            // encontrar user por hash confirm_hash
            const user = await UserModel.findOne({ confirm_hash: hash });
    
            if (!user) {
                return res.status(404).json({ message: 'Usuario con el mismo hash no encontrado.' });
            }
    
            // Si hemos encontrado el usuario, confirmamos usuario
            user.confirmed = true;
    
            // Guardamos los datos
            await user.save();
    
            // devolvemos respuesta
            return res.status(200).json({ message: 'User confirmed successfully' });
        } catch (error) {
            console.error('Error during user confirmation:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    show = async (req: express.Request, res: express.Response) => {
        try {
            const id: string = req.params.id;
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({
                    message: 'No encontrado'
                });
            }
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: 'Identificador incorrecto' });
        }
    }

    getMe = async (req: express.Request, res: express.Response) => {
        try {
            const userAuthenticated = req.user as IUser;
            const id: string = userAuthenticated._id;
            
            const user = await UserModel.findById(id);
            if (!user) {
                return res.status(404).json({
                    message: 'No encontrado'
                });
            }
            
            res.json(user);
        } catch (error) {
            res.status(404).json({ message: 'Identificador incorrecto' });
        }
    }
    
    findUsers = (req: any, res: express.Response) => {
        const query: string = req.query.query;
        const authorId: string = req.query.authorId; // obtener authorId
    
        // Buscamos los usuarios menos el nuestro usuario
        UserModel.find({ _id: { $ne: authorId } })
            .or([
                { username: new RegExp(query, "i") }, 
                { email: new RegExp(query, "i")}
            ])
            .then((users: any) => res.json(users))
            .catch((err: any) => {
                return res.status(404).json({
                    status: "error",
                    message: err
                });
        });
    };
    
    delete = async (req: express.Request, res: express.Response) => {
        try {
            const id: string = req.params.id;
            const user = await UserModel.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({
                    message: 'No encontrado'
                });
            }
            res.status(200).json({
                message: `User ${user.username} eliminado`,
                eliminatedUser: user,
            });
        } catch (error) {
            res.status(404).json({ message: 'Identificador incorrecto' });
        }
    }

    login = async (req: express.Request, res: express.Response) => {
        const { email, password } = req.body;
    
        try {
            const user = await UserModel.findOne({ email });
    
            if (!user) {
                return res.json({
                    status: 'error',
                    message: 'Usuario no encontrado'
                });
            }
    
            // Comporar password con hash
            const passwordMatch = await bcrypt.compare(password, user.password);
    
            if (passwordMatch) {
                const token = createJWTToken(user);
    
                return res.json({
                    status: 'success',
                    token
                });
            } else {
                return res.json({
                    status: 'error',
                    message: 'Contraseña o email incorrectos'
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
            return res.json({
                status: 'error',
                message: 'Error interno del servidor'
            });
        }
    }

    create = async (req: express.Request, res: express.Response) => {
        const postData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        }

        const user = new UserModel(postData);
    
        user.save()
            .then((obj: any) => {
                res.json(obj);
        }).catch(reason => {
            return res.json({
                status: 'error',
                message: reason
            });
        })
        
    }
}

export default UserController;