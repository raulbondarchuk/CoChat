import React from 'react';
import classNames from 'classnames';
import format from 'date-fns/format';
import { isToday } from 'date-fns';
import { Link } from 'react-router-dom';
import { IconReaded, Avatar } from '../'

const getMessageTime = created_at => {
    if(isToday(new Date(created_at))) {
        return format(created_at, "HH:mm");
    } else {
        return format(created_at, "dd.MM.yyyy");
    }
};


const DialogItem = ({ 
    _id, 
    user, 
    unread, 
    created_at, 
    lastMessage, 
    isMe, 
    currentDialogId, 
    onSelect 
}) => {
    
    

    if (!user) {
        return null; // en caso de que no hay dialogs
    } else {
        //console.log(`dialog id: ${_id}`);
        //console.log(user);
    }
    
    return (
        <Link to={`/dialog/${_id}`} className='link-item'>
            <div className={classNames('dialogs__item', {
                'dialogs__item--online': user.isOnline,
                'dialogs__item--selected': currentDialogId === _id
                })} onClick={ onSelect.bind(this, _id)}>


                <div className='dialogs__item-avatar'> <Avatar user={user}/> </div>
                <div className='dialogs__item-info'>
                    <div className='dialogs__item-info-top'>
                        <b>{ user.username }</b>
                        <span>
                            {getMessageTime(created_at)}
                        </span>
                    </div>
                    <div className='dialogs__item-info-bottom'>
                        <p>{lastMessage.text}</p>
                        { isMe && <IconReaded isMe={isMe} isReaded={lastMessage.readed} />}
                        { unread > 0 && <div className='dialogs__item-info-bottom-count'>{unread > 9 ? "+9" : unread}</div>}
                    </div>
                    
                </div>
            </div>
        </Link>
    );
    
}
export default DialogItem;


/*
import React from 'react';
import classNames from 'classnames';
import format from 'date-fns/format';
import { isToday } from 'date-fns';
//import { Link, useLocation, useHistory } from 'react-router-dom';
import { IconReaded, Avatar } from '../'

const getMessageTime = created_at => {
    if(isToday(new Date(created_at))) {
        return format(created_at, "HH:mm");
    } else {
        return format(created_at, "dd.MM.yyyy");
    }
};


const DialogItem = ({ 
    _id, 
    user, 
    unread, 
    created_at, 
    text, 
    isMe, 
    currentDialogId 
}) => {
    const handleClick = () => {
        window.location.href = `/dialog/${_id}`; 
    };

    if (!user) {
        return null; 
    }

    return (
        <div className={classNames('dialogs__item', {
            'dialogs__item--online': user.isOnline,
            'dialogs__item--selected': currentDialogId === _id
        })} onClick={handleClick}>
            <div className='dialogs__item-avatar'>
                <Avatar user={user}/>
            </div>
            <div className='dialogs__item-info'>
                <div className='dialogs__item-info-top'>
                    <b>{user.username}</b>
                    <span>{getMessageTime(created_at)}</span>
                </div>
                <div className='dialogs__item-info-bottom'>
                    <p>{text}</p>
                    {isMe && <IconReaded isMe={true} isReaded={true} />}
                    {unread > 0 && <div className='dialogs__item-info-bottom-count'>{unread > 9 ? "+9" : unread}</div>}
                </div>
            </div>
        </div>
    );
}

export default DialogItem;

*/