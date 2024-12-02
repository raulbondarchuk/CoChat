import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { dialogsActions } from "../redux/actions";
import socket from 'core/socket';
import { Dialogs as BaseDialogs } from 'components'; 

const Dialogs = ({ 
    fetchDialogs, 
    currentDialogId, 
    setCurrentDialogId, 
    items, 
    userId 
}) => {

    const [inputValue, setValue] = useState('');
    const [filtred, setFiltredItems] = useState(Array.from(items));
    const [hasFetched, setHasFetched] = useState(false); // Nuevo estado para rastrear si la solicitud se completo

    const onChangeInput = (value = "") => {
        setFiltredItems( 
            items.filter( 
                dialog => 
                    dialog.author.username.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                    dialog.partner.username.toLowerCase().indexOf(value.toLowerCase()) >= 0
                )
        );
        setValue(value);
    };

    useEffect(() => {
        if(items.length) {
            onChangeInput();
        }
    }, [items]);

    /*const onNewDialog = () => {
        fetchDialogs();
    }*/

    useEffect(() => {
        if(!items.length && !hasFetched) {
            fetchDialogs();
            setHasFetched(true); // Establecer que la solicitud se ha completado
        } else {
            setFiltredItems(items);
        }

        const handleNewDialog = (data) => {
            fetchDialogs();
        };

        socket.on('SERVER:DIALOG_CREATED', handleNewDialog);
        return () => {
            socket.off('SERVER:DIALOG_CREATED', handleNewDialog);
        };
        
    }, [items, hasFetched, fetchDialogs]);

    return (
        <BaseDialogs
            userId={userId}
            items={filtred} 
            onSearch= {onChangeInput}
            inputValue={inputValue} 
            onSelectDialog={setCurrentDialogId}
            currentDialogId={currentDialogId}
        />
    )
};

export default connect(({ dialogs }) => dialogs, dialogsActions)(Dialogs);
