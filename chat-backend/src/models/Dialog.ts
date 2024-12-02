import mongoose, { Schema } from 'mongoose';

const DialogSchema = new Schema({
    
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        require: true,
    },
    partner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        require: true,
    },
    lastMessage: { 
        type: Schema.Types.ObjectId, 
        ref: 'Message',
        
    },

}, {
    timestamps: true,
});

const DialogModel = mongoose.model('Dialog', DialogSchema);

export default DialogModel;