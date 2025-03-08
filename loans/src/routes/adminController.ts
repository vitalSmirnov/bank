import express, { Router, Request, Response, NextFunction } from 'express'
import { authentificateAdmin } from '../middlewares/auth';
import { SetStatusModel } from '../domain/dtos/setStatusModel';
import { acceptRequest, closeCreditDeb, setStatus } from '../services/adminService';



const router = Router()


// accept request for credit
router.post('/accept/:id', authentificateAdmin, async (req: Request<{id: string}>, res: Response,  next: NextFunction) => {
      const id = req.params.id
    const response = await acceptRequest(id)
      res.status(200).send(response)
      next()
});

// close credit deb
router.post('/close/:id', authentificateAdmin, async (req: Request<{id: string}>, res: Response,  next: NextFunction) => {
            const id = req.params.id
    const response = await closeCreditDeb(id)
      res.status(200).send(response)
      next()
});


// set credit status
router.patch('/status/:id', authentificateAdmin, async (req: Request<{id: string}, {}, SetStatusModel>, res: Response,  next: NextFunction) => {
    const id = req.params.id
    const body = req.body
    const response = await setStatus(id , body.status)
      res.status(200).send('Succesfully')
      next()
});


export default router