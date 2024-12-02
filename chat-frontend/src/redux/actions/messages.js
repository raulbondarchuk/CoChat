import { messagesApi } from "utils/api";

const Actions = {

    setMessages: items => ({
        type: "MESSAGES:SET_ITEMS",
        payload: items
    }),
    addMessage: message => (dispatch, getState) => {
        const { dialogs } = getState();
        const { currentDialogId } = dialogs;
        // console.log("ACTIONS CURRENT DIALOG ID: " + currentDialogId)
        // console.log("ACTIONS MESSAGE DIALOG ID: " + message.dialog)


        if(currentDialogId === message.dialog) {
            dispatch({
                type: "MESSAGES:ADD_MESSAGE",
                payload: message
            });
        }
    },
    fetchSendMessage: (text, dialogId) => dispatch => {
        messagesApi.send(text, dialogId);
    },
    
    setIsLoading: boolean => ({
        type: "MESSAGES:SET_IS_LOADING",
        payload: boolean
    }),

    clearMessages: () => ({
        type: "MESSAGES:CLEAR_ITEMS"
    }),


    removeMessageById: (id) => (dispatch, getState) => {
        const { messages } = getState();
        const messageToRemove = messages.items.find(message => message._id === id);

        if (!messageToRemove) {
            return;
        }

        if (window.confirm('¿Estás seguro de que deseas eliminar el mensaje?')) {
            messagesApi
                .removeById(id)
                .then(({ data }) => {
                    
                    // console.log(data.eliminatedMessage.dialog);
                    
                    dispatch({
                        type: "MESSAGES:REMOVE_MESSAGE",
                        payload: id
                    });
                    // Despues de eliminar el mensaje, nos hagamos aquí un fetchMessages para Redux
                    dispatch(Actions.fetchMessages(data.eliminatedMessage.dialog));
                    //io.emit('messageDeleted', messageForElim.dialog);
                })
                .catch(() => {
                    dispatch(Actions.setIsLoading(false));
                });
        }
    },


    fetchMessages: (dialogId, userId) => dispatch => {

        // console.log("fetchMessages userId: " + userId)

        dispatch(Actions.setIsLoading(true));
        messagesApi.getAllByDialogId(dialogId, userId).then(({ data }) => {

            // console.log(data);

            dispatch(Actions.setMessages(data));
        })
        .catch(() => {
            dispatch(Actions.setIsLoading(false));
        })
    },
    
}

export default Actions;