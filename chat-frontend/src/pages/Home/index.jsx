import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux';
import { useLocation, useNavigate  } from 'react-router-dom';
import { Messages, ChatInput, Status, Sidebar } from 'containers';
import { Button, Popover, message } from "antd";

import { EllipsisOutlined, RollbackOutlined  } from '@ant-design/icons';
import { dialogsActions, messagesActions } from './../../redux/actions';

import "./Home.scss";

const Home = () => {
    const location = useLocation();
    const isIMPath = location.pathname.includes('/im');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // No funciona como tiene que funcionar
    const handleRollbackClick = () => {
        navigate('/im');
        dispatch(messagesActions.clearMessages());
        dispatch(dialogsActions.clearCurrentDialog());
        
    };

    const [popoverVisible, setPopoverVisible] = useState(false);

    // Para salir de la cuenta
    const exitOfAccount = () => {
        window.localStorage.clear();
        window.location.href = '/login';

        message.success('Sessión cerrada exitosamente.');
        
        setPopoverVisible(false);
    };

    const onConfigAccaunt = () => {
        message.success('El usuario abre las configuraciones');   
        setPopoverVisible(false);
    };

    
    return (
        <section className = "home">
        <div className="chat">
            
            <div className="chat__sidebar"> <Sidebar  /> </div>
                
            <div className="chat__dialog">

            {!isIMPath && (
                        <Button 
                            className='border-none chat__dialog-rollback' 
                            icon={<RollbackOutlined className="action-icon-size" />} 
                            onClick={handleRollbackClick} 
                        />
                    )}

                <div className="chat__dialog-header">
                    <div/>
                    <Status online/>
                    <Popover title="Acciones" trigger="click" open={popoverVisible} onOpenChange={setPopoverVisible}
                            content={
                                <div>
                                    <Button style={{ width: "100%" }} onClick={onConfigAccaunt}>Configuraciones</Button>
                                    <Button style={{ width: "100%", marginBottom: "10px" }} onClick={exitOfAccount}>Salir de la cuenta</Button> 
                                    
                                </div>
                            }
                        > 
                        <EllipsisOutlined style={{ fontSize: "22px" }} className="action-icon"/>
                    </Popover>

                </div>
                <div className="chat__dialog-messages">
                    <Messages/>
                </div>
                <div className="chat__dialog-input">
                    <ChatInput/>
                </div>
            </div>
        </div>
    </section>
    )
}
const mapStateToProps = state => ({
    userId: state.user.data._id  // userId
});
export default connect(mapStateToProps)(Home);


//export default Home;

