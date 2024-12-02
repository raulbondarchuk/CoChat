import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { resolve } from 'path';

import './core/db';
import createRoutes from './core/routes';
import createSocket from './core/socket';

const app = express();
const http = createServer(app);
const io = createSocket(http);

dotenv.config({ path: resolve(__dirname, '.env') }); //dotenv.config(); //console.log(process.env.JWT_SECRET);

createRoutes(app, io);


const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3003; //const port = 3003
http.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


