import express from 'express';
import adminController from './routes/adminController';
import customerController from './routes/userController';
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';
import { checkPayments } from './services/checkPayments';

export const prisma = new PrismaClient();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/admin', adminController);
app.use('/customer', customerController);


const job = cron.schedule(
  " * * */1 * * *",
  () => {
    checkPayments();
  },
  {
    scheduled: false,
    timezone: "Russia/Tomsk",
  }
);

job.start();


app.listen(PORT, () => {
    console.log(`Loans service is running on port ${PORT}`);
})