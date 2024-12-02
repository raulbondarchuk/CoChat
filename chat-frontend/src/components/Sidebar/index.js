import React, {useState} from "react";
import { TeamOutlined, FormOutlined} from '@ant-design/icons';
import { Modal, Select, Input, Button, Form }from "antd";
import { Dialogs } from 'containers';

import "./sidebar.scss"

const { Option } = Select;
const { TextArea } = Input;


const Sidebar = ({ 
    user, 
    visible,
    isLoading,
    messageText,
    selectedUserId,
    inputValue, 
    users, 
    onShow, 
    onClose, 
    onSearch, 
    onChangeInput,
    onSelectUser,
    onChangeTextArea,
    onModalOk

}) => {

    const options = users.map(user => <Option key={user._id}>{user.username}</Option>);

    return (
        <div className="chat__sidebar">
            <div className="chat__sidebar-header">
                <div>
                    <TeamOutlined />
                    <span>Lista de los diálogos</span>
                </div>
                <FormOutlined className="action-icon" onClick={onShow} />
            </div>

            <div className="chat__sidebar-dialogs">
                <Dialogs userId={user && user._id} />
            </div>

            <Modal
                title="Crear diálogo"
                open={visible}
                // onOk={onModalOk}
                onCancel={onClose}
                // okText="Crear"
                // cancelText="Cancelar"
                // confirmLoading={isLoading}
                footer={[
                    <Button 
                        key="back" 
                        onClick={onClose}>
                        Cancelar
                    </Button>,
                    <Button
                        disabled={!messageText || !inputValue}
                        key="submit" 
                        type="primary" 
                        loading={isLoading} 
                        onClick={onModalOk}>
                        Crear
                    </Button>
                ]}
            >
                <br/>
                <Form className="add-dialog-form">
                    <div className="form-item">
                        <label>Introduzca el nombre/email del usuario:</label>
                        <div className="form-input">
                            <Select
                                placeholder="Introduzca nombre/email del usuario"
                                value={inputValue}
                                onSearch={onSearch}
                                onChange={onChangeInput}
                                onSelect={onSelectUser}
                                notFoundContent={null}
                                style={{ width: '100%' }}
                                defaultActiveFirstOption={false}
                                filterOption={false} 
                                showSearch>
                                    {options}
                            </Select>
                        </div>
                    </div>
                    { selectedUserId && <div className="form-item">
                        <label>Introduzca el mensaje:</label>
                        <div className="form-input">
                            <TextArea 
                                placeholder="Introduzca el mensaje"
                                autosize={{ minRows: 2, maxRows: 6 }}
                                onChange={onChangeTextArea}
                                value={messageText}   
                            />
                        </div>
                    </div>}
                    <br/>
                </Form>

            </Modal>
        </div>
    );
}

export default Sidebar;