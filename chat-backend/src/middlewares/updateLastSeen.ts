import express from 'express';
import { UserModel } from '../models';
import { IUser } from '../models/User'; 

const updateLastSeen = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user = req.user as IUser; // Conversión de tipo explícita si es necesario
    if (user && user._id) {
        try {
            const userModel = await UserModel.findById(user._id);
            if (userModel) {
                userModel.last_seen = new Date();
                await userModel.save();
            }
        } catch (error) {
            console.error('Error updating last_seen:', error);
        }
    }

    next();
};

export default updateLastSeen; 
