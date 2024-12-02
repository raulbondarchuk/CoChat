import { axios } from 'core';

export default {
    getAll: () => axios.get("/dialogs"),
    create: (authorId, partnerId, textMessage) => axios.post("/dialogs", {author: authorId, partner: partnerId, text: textMessage}),
};




