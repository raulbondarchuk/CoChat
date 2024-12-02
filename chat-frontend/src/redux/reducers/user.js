const userDataFromStorage = JSON.parse(localStorage.getItem('userData'));

const initialState = {
    data: userDataFromStorage,
    token: window.localStorage.token,
    isAuth: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "USER:SET_DATA":
        return {
            ...state,
            data: payload,
            isAuth: true,
            token: window.localStorage.token,
            
        };
        case "USER:SET_IS_AUTH":
        return {
            ...state,
            isAuth: payload
        };
        default:
        return state;
    }
};
