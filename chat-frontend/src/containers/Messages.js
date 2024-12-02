import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { messagesActions } from "../redux/actions";
import socket from 'core/socket';
import { Messages as BaseMessages } from 'components'; 

const Dialogs = ({ currentDialogId, fetchMessages, addMessage, items, user, isLoading, removeMessageById, readMessages, dispatch}) => {
    const messagesRef = useRef(null);
    
    // Añadimos handler para nuevos mensajes
    const onNewMessage = (data) => {
        // console.log("New message received:", data);
        addMessage(data);
    };

    // console.log("\n-------------------------------");
    // console.log(user._id);
    // console.log("-------------------------------\n");

    useEffect(() => {
        if(currentDialogId) {
            fetchMessages(currentDialogId, user._id);
        }

        socket.on('SERVER:NEW_MESSAGE', onNewMessage);

        // función para clear effect
        return () => socket.off('SERVER:NEW_MESSAGE', onNewMessage);
        


    }, [currentDialogId, fetchMessages, addMessage]);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 99999);

    }, [items]);

    useEffect(() => {
        
        const onMessageDeleted = (dialogId) => {
            // console.log(user._id)
            if (currentDialogId === dialogId) {
                fetchMessages(dialogId, user._id);
            }
        };
    
        socket.on('messageDeleted', onMessageDeleted);
    
        return () => {
            socket.off('messageDeleted', onMessageDeleted);
        };
    }, [currentDialogId, fetchMessages]);

    return (
        <BaseMessages user={user} blockRef={messagesRef} items={items} isLoading={isLoading} onRemoveMessage={removeMessageById} />
    )
};



export default connect(
    ({ dialogs, messages, user }) => ({ 
        currentDialogId: dialogs.currentDialogId, 
        items: messages.items,
        isLoading: messages.isLoading,
        user: user.data
    }),
    messagesActions
)(Dialogs);

// 53:28
// 53:28
// 53:28
// 53:28
// 53:28
// 53:28