import React, { useState } from "react";

import { Sidebar } from '../components';
import { connect } from 'react-redux';
import { userApi, dialogsApi } from "../utils/api";
//import { userApi } from '../utils/api';


const SidebarContainer = ({ user }) => {
    const [visible, setVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messageText, setMessageText] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(false);


    const onClose = () => {
        setVisible(false);
    }

    const onShow = () => {
        setVisible(true);
    }

    const onSearch = (value) => {
        setIsLoading(true);
        userApi.findUsers(user._id,value).then(({ data }) => {
            setUsers(data);
            
        }).catch(() => {
            setUsers([]);
        }).finally(() => {
            setIsLoading(false); // Cuando se encuentra users se desbloquea el botón
        });
        
    }

    // console.log(user._id);
    // console.log(selectedUserId);
    // console.log(messageText);

    const onAddDialog = () => {
        dialogsApi
        .create(user._id, selectedUserId, messageText)
        .then(({ data }) => {
            // console.log(data);
            // setUsers(data);
            // setIsLoading(false);
            onClose();
        })
        .catch(() => {
            setIsLoading(false);
        });
    }

    const onChangeTextArea = e => {
        setMessageText(e.target.value);
    }

    const handleChangeInput = (value) => {
        setInputValue(value)
    }

    const onSelectUser = userId => {
        setSelectedUserId(userId)
    }

    return (
        <Sidebar 
            user={user}
            inputValue={inputValue}
            setInputValue={setInputValue}
            visible={visible} 
            isLoading={isLoading}
            onClose={onClose} 
            onShow={onShow}
            onSearch={onSearch}
            onChangeInput={handleChangeInput}
            onSelectUser={onSelectUser}
            onModalOk={onAddDialog}
            onChangeTextArea={onChangeTextArea}
            messageText={messageText}
            selectedUserId={selectedUserId}
            users={users}
        />
    );
};
/*
Sidebar.defaultProps = {
    users: []
}*/
//VIDEO 1:17:50
export default connect(({ user }) => ({ user: user.data}))(SidebarContainer);