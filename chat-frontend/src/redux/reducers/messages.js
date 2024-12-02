const initialState = {
    items: [],
    isLoading: false,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'MESSAGES:ADD_MESSAGE':
            //console.log("Adding message to state:", payload);
            return {
                ...state,
                items: [ ...state.items, payload ],
            };
        case "MESSAGES:CLEAR_ITEMS":
            return {
                ...state,
                items: []
            };
        case 'MESSAGES:SET_ITEMS':
            //console.log('Received messages:', payload);
            return {
                ...state,
                items: payload,
                isLoading: false,
            };
        case 'MESSAGES:REMOVE_MESSAGE':
            return {
                ...state,
                items: state.items.filter(message => message._id !== payload)
            };
        case 'MESSAGES:SET_IS_LOADING':
            //console.log('Received messages:', payload);
            return {
                ...state,
                isLoading: payload
            };
            
            
        default:
            return state;
    }
}


