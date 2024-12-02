import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    
    text: { type: String, require: true },
    dialog: { type: Schema.Types.ObjectId, ref: "Dialog", require: true },
    user: { type: Schema.Types.ObjectId, ref: "User", require: true },
    readed: { type: Boolean, default: false },
    
    // TODO: hacer attachments para los archivos/fotos
    // attachments: 
}, {
    timestamps: true,
});

const MessageModel = mongoose.model('Message', MessageSchema);

export default MessageModel;