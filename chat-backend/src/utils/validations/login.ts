import { check, validationResult } from 'express-validator';

export default  [
    check('username').isEmail(),
    // password must be at least 5 chars long 
    check('password').isLength({ min: 5 }),
];