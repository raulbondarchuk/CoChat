import { axios } from 'core';
// eslint-disable-next-line
export default {
    login: ( postData ) => axios.post("/user/login", postData),
    register: ( postData ) => axios.post("/user/registration", postData),
    getMe: () => axios.get("/user/me"),
    //findUsers: (query) => axios.get("/user/find?query=" + query)
    findUsers: (authorId, query) => axios.get("/user/find?authorId=" + authorId + "&query=" + query)
    
};



