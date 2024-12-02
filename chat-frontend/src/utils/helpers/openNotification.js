import { notification } from 'antd';

export default ( { text, type = 'info', title, duration = 2 }) => 
    notification[type] ({
        message: title,
        description: text,
        duration: duration
    });