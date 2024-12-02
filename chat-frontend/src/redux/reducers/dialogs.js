const initialState = {
    items: [],
    currentDialogId: window.location.pathname.split('dialog/')[1],
    isLoading: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'DIALOGS:SET_ITEMS':
            // console.log('Received messages DIALOGS:', payload);
            return {
                ...state,
                items: payload
            };
        case "DIALOGS:SET_CURRENT_DIALOG_ID":
        return {
            ...state,
            currentDialogId: payload
            };
        case "DIALOGS:CLEAR_CURRENT_DIALOG":
            return {
                ...state,
                currentDialogId: null
            };

        default:
            return state;
    }
}