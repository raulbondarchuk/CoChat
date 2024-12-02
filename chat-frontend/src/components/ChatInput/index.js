import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import { Input, Button } from "antd";
import { UploadField } from '@navjobs/upload'; 

import Picker from '@emoji-mart/react';



import { useLocation } from 'react-router-dom';

import './ChatInput.scss';

const ChatInput =  props => {
    const [value, setValue] = useState('');
    const [emojiPickerVisible, setShowEmojiPicker] = useState(false);
    const { onSendMessage, currentDialogId } = props;
    const location = useLocation();
    const isIMPath = location.pathname.includes('/im');

    useEffect(() => {
        if (isIMPath) {
            setValue('');
        }
    }, [isIMPath]);

    const toggleEmojiPicker = () => {
        setShowEmojiPicker(!emojiPickerVisible);
        //console.log("Emoji picker visible:", !emojiPickerVisible);
    };

    const sendMessage = () => {
        if (value.trim()) {
            onSendMessage(value, currentDialogId);
            setValue("");
        }
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    
    

    if (isIMPath) {
        return null; // Si estamos en /im ocultamos ChatInput
    }

    const addEmoji = (emoji) => {
        // console.log("Emoji selected:", emoji);
        setValue(value + ' ' + emoji.native); // emoji para chat
    };

    return (
        <div className={`chat-input ${isIMPath ? 'disabled' : ''}`} >
            <div className='chat-input__smile-btn'>
                {emojiPickerVisible && 
                <div className='chat-input__emoji-picker'>
                    <Picker onEmojiSelect={addEmoji} theme="dark" set="apple" locale="es"/>                
                </div>
                }

                <Button onClick={toggleEmojiPicker} className='border-none' icon={<SmileOutlined className="action-icon-size"/>}  />
            </div>
    
            <Input 
                onChange={ e => setValue(e.target.value)} 
                onKeyUp={handleKeyUp}
                size='large'  
                placeholder="Escribe su mensaje..."
                value={value}
                
            />
    
            <div className='chat-input__actions' >
                
                <UploadField 
                    onFiles={(files) => {
                        console.log(files);
                    }}
                    containerProps={{
                        className: "action-icon"
                    }}
                    uploadProps={{
                        accept: ".jpg, .png, .jpeg, .gif, .bmp", 
                        multiple: "multiple"
                    }}
                    
                >
                    <Button className={`border-none ${isIMPath ? 'disabled' : ''}`} icon={<CameraOutlined className="action-icon-size"/>}  />
                </UploadField>

                { value ? 
                    <Button className={`action-icon ${isIMPath ? 'disabled' : ''}`} icon={<SendOutlined className="action-icon-size" onClick={sendMessage}/>} /> :  
                    <Button className={`action-icon ${isIMPath ? 'disabled' : ''}`} icon={<AudioOutlined className="action-icon-size"/>} />} 
                
                
            </div>
        </div>
    )
};

ChatInput.propTypes = {
    className: PropTypes.string
}

export default ChatInput;
