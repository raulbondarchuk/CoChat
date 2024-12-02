import { axios } from 'core';
// eslint-disable-next-line
export default {
    getAllByDialogId: (id, userId) => axios.get(`/messages/${id}/${userId}`),
    removeById: id => axios.delete(`/messages/${id}`),
    send: (text, dialogId) => axios.post(`/messages`, {
        "text": text,
        "dialog_id": dialogId
    }),
    
};



