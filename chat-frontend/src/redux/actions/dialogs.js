import { dialogsApi } from "../../utils/api";

const Actions = {
    setDialogs: items => ({
        type: "DIALOGS:SET_ITEMS",
        payload: items
    }),

    setCurrentDialogId: id => ({
        type: "DIALOGS:SET_CURRENT_DIALOG_ID",
        payload: id
    }),

    clearCurrentDialog: () => ({
        type: "DIALOGS:CLEAR_CURRENT_DIALOG"
    }),

    fetchDialogs: () => dispatch => {
        dialogsApi.getAll().then(({ data }) =>  {
            //console.log(data);
            dispatch(Actions.setDialogs(data));
        });
    }


}

export default Actions;