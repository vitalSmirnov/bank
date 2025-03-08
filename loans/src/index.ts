import express from 'express';
import adminController from './routes/adminController';
import customerController from './routes/userController';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/admin', adminController);
app.use('/customer', customerController);

app.listen(PORT, () => {
    console.log(`Loans service is running on port ${PORT}`);
})