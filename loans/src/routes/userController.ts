import express, { Router, Request, Response, NextFunction } from 'express'
import { authentificate, getUserId } from '../middlewares/auth';
import { CreateCreditModel } from '../domain/dtos/createCreditModel';
import { createRequest } from '../services/userService';


const router = Router()


// create request for credit
router.post('/login', authentificate,  async (req: Request<{}, {}, CreateCreditModel>, res: Response,  next: NextFunction) => {
      const loginCreds = req.body
      const userId = getUserId(req.headers['authorization'])
        const response = await createRequest(loginCreds, userId!) 
      res.status(200).send(response)
      next()
});


export default router