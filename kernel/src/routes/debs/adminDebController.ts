import express, { Router, Request, Response, NextFunction } from 'express'
import {closeDeb, getDeb, getFilteredDebs, getUserDebs } from '../../services/adminDebService'
import { authentication } from '../../middlewares/auth'

const router = Router()

// router.use(authentication)

router.get('/deb', async (req: Request<any, {userId?: string, debId?: string }>, res: Response,  next: NextFunction) => {
      const userId = req.params.userId
      const debId = req.params.debId
      const createdDeb = await getFilteredDebs(userId, debId)
      res.status(201).send(createdDeb)
      next()
  });

router.get('/deb/:id', async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
      try {
          const debId = req.params.id
          const deb = await getDeb(debId)
          res.status(200).send(deb)
          next()
      } catch (error) {
          res.status(500).send({error: 'An error occurred while fetching deb'})
      }
  });

router.get('/user/:userId', async (req: Request<{userId: string}>, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId
        const deb = await getUserDebs(userId)
        res.status(200).send(deb)
        next()
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching deb'})
    }
});

router.post('/deb/:debId/close', async (req: Request<{debId: string}>, res: Response, next: NextFunction) => {
    try {
        const debId = req.params.debId
        const deb = await closeDeb(debId)
        res.status(200).send(deb)
        next()
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching deb'})
    }
});

export default router