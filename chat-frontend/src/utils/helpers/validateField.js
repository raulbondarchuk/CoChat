// eslint-disable-next-line
export default (key, touched, errors) => {
    if(touched[key]){
        if(errors[key]){
            return "error";
        }
        else {
            return "";
        }
    }  
};