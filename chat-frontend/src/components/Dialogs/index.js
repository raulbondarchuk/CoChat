import React from 'react';
import {  SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import orderBy from 'lodash/orderBy';
import { DialogItem } from '../';
import { Input, Empty } from "antd";

import './Dialogs.scss'


const Dialogs = ({ items, userId, onSearch, inputValue, currentDialogId, onSelectDialog }) => {
    const navigate = useNavigate(); 

    return (
        <div className="dialogs">
            <div className="dialogs__search">
                <div className="flex-items">
                    <Input
                        placeholder="Buscar contactos"
                        onChange={e => onSearch(e.target.value)}
                        value={inputValue} 
                    /> 
                    <SearchOutlined className="search-icon"/>
                </div>
            </div>
                
            {items.length ? orderBy(items, ["created_at"], ["desc"]).map(item => {
                const isAuthor = item.author._id === userId;
                const partnerData = isAuthor ? item.partner : item.author;

                return (
                    <DialogItem 
                        onSelect={() => {
                            onSelectDialog(item._id); // Llame a la función onSelectDialog pasada si es necesario
                            navigate(`/dialog/${item._id}`); // Cambia la URL sin recargar la página.
                        }}
                        _id={item._id}
                        user={partnerData}
                        unread={item.lastMessage.unread}
                        created_at={item.lastMessage.createdAt}
                        lastMessage={item.lastMessage}
                        isMe={isAuthor}
                        currentDialogId={currentDialogId}
                    />
                );
            }) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No hay contactos" />
            )}
        </div>
    );
};

export default Dialogs;