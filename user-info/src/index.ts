import { PrismaClient } from '@prisma/client';
import express from 'express';

import authController from './routes/authRoute'
import profileController from './routes/profileRoute'


export const prisma = new PrismaClient()


const app = express();

const PORT = process.env.PORT;

app.use(express.json())

app.use('/api/auth', authController)
app.use('/api', profileController)

app.listen(PORT, () => {
 console.log('Start auth server on port ' + PORT)
})