import { openNotification } from 'utils/helpers';
import { userApi } from "utils/api";

const Actions = {
    setUserData: data => ({
        type: "USER:SET_DATA",
        payload: data
    }),
    setIsAuth: bool => ({
        type: "USER:SET_IS_AUTH",
        payload: bool
    }),
    fetchUserData: () => dispatch => {
        return userApi.getMe().then(({ data }) => {
            //console.log(data)
            dispatch(Actions.setUserData(data)); // Guardar los datos del usu Redux Store
            localStorage.setItem('userData', JSON.stringify(data));
            return data;
        })
        .catch(err => {
            if (err.response.status === 403) {
                //dispatch(Actions.setIsAuth(false));
                //delete window.localStorage.token;
                dispatch(Actions.setIsAuth(false))
                delete window.localStorage.token;
                
                //throw err;
            }
        });
    },
    fetchUserLogin: (postData) => async (dispatch) => {
        try {
            const { data } = await userApi.login(postData);
            const { status, token } = data;

            if (status === 'error') {
                openNotification({ 
                    title: 'Estado de la autorización',
                    text: 'Login o contraseña incorrectos.',
                    type: 'error',
                });
            } else {
                openNotification({ 
                    title: 'Estado de la autorización',
                    text: 'Autorización exitosa!',
                    type: 'success',
                });
                window.axios.defaults.headers.common["token"] = token;
                window.localStorage['token'] = token;
                const userData = await dispatch(Actions.fetchUserData()); // Esperar los datos del usuario
                
                return { status, data: userData }; // volver status y datos del usuario
            }
            return data;
        } catch (error) {
            return error;
        }
    },
    fetchUserRegister: (postData) => dispatch => {
        
        return userApi.register(postData).then(({ data }) => {
            //console.log(data);
            console.log(data);

            if(data.status === 'error'){
                openNotification({ 
                    title: 'Estado del registro',
                    text: 'Se produjo un error durante el registro. Es posible que este correo electrónico ya esté en uso.',
                    type: 'error',
                });
            }

            return data;
        });
            
        
    }
};

export default Actions;