import { verifyJWTToken } from '../utils';

export default (req: any, res: any, next: any) => {

    if (req.path === '/index.html') {
        return next(); // Pasar sin comprobar token
    }

    if(req.path === '/user/login' || req.path === '/user/registration' || req.path === '/user/verify') {
        return next();
    }

    const token = req.headers.token;
    //console.log(token);

    verifyJWTToken(token)
        .then((user: any) => {
            req.user = user.data._doc;
            next();
        })
        .catch(() => {
            res.status(403).json({ message: 'Invalid auth token provided.' });
        });
};
