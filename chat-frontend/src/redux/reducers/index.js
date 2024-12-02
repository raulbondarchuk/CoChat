import { combineReducers } from "redux";

const reducers = ['messages', 'dialogs', 'user'];

export default combineReducers(
    reducers.reduce((initial, name) => {
        initial[name] = require(`./${name}`).default;
        return initial;
    }, {}),
);



/*
import { combineReducers } from "redux";

import dialogs from "./dialogs";
import messages from "./messages";


export default combineReducers({
    dialogs,
    messages
});
*/