import { PrismaClient } from '@prisma/client';
import express , {Request, Response, NextFunction} from 'express';
import debController from './routes/debs/debController'
import adminController from './routes/debs/adminDebController'
import { IDeb } from './domain/schema/debSchema';
import { createDeb, getDeb } from './services/debService';

export const prisma = new PrismaClient()


const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.json())
app.use('/api/user', debController)
app.use('/api/admin', adminController)

app.listen(PORT, () => {
    console.log('Start server')
})