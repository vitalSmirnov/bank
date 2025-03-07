import express, { Router, Request, Response, NextFunction } from 'express'
import { IDeb } from '../../domain/schema/debSchema'
import { closeDeb, createDeb, getDeb, getUserDebs, intakeMoney, purchaseMoney, transferMoney, updateDeb } from '../../services/debService'
import { authentication, getUserId } from '../../middlewares/auth'

const router = Router()

type IDebModel = Omit<IDeb, "id" | "createdAt" | "amount">

// router.use(authentication)

// create deb
router.post('/', async (req: Request<{}, {}, IDebModel>, res: Response,  next: NextFunction) => {
      const debModel = req.body
      const createdDeb = await createDeb(debModel)
      res.status(201).send(createdDeb)
      next()
  });

// get deb by id
router.get('/:id', async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers['authorization'];
          const debId = req.params.id
          const deb = await getDeb(getUserId(authHeader), debId)
          res.status(200).send(deb)
          next()
      } catch (error) {
          res.status(500).send({error: 'An error occurred while fetching deb'})
      }
  });

  // get debs by user
router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const deb = await getUserDebs(getUserId(authHeader))
        res.status(200).send(deb)
        next()
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching deb'})
    }
});

  // update deb
router.put('/:id/edit', async (req: Request<{id: string}, {}, IDebModel>, res: Response, next: NextFunction) => {
    try {
        const payload = req.body
        const debId = req.params.id
        const deb = await updateDeb(debId, payload)
        res.status(200).send(deb)
        next()
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching deb'})
    }
});

  // close deb
router.delete('/:id/close', async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    try {
        const debId = req.params.id
        const deb = await closeDeb(debId)
        res.status(200).send(deb)
        next()
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching deb'})
    }
});

  // purchase money deb
router.post('/:id/purchase', async (req: Request<{id: string}, {}, {amount: number}>, res: Response, next: NextFunction) => {
    try {
        const amount = req.body.amount
        const debId = req.params.id
        const deb = await purchaseMoney(debId, amount)
        res.status(200).send(deb)
        next()
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching deb'})
    }
});

  // intake money deb
router.post('/:id/intake', async (req: Request<{id: string}, {}, {amount: number}>, res: Response, next: NextFunction) => {
    try {
        const amount = req.body.amount
        const debId = req.params.id
        const deb = await intakeMoney(debId, amount)
        res.status(200).send(deb)
        next()
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching deb'})
    }
});

router.post('/:senderId/transfer', async (req: Request<{senderId: string},{}, {amount: number, recieverId: string}>, res: Response, next: NextFunction) => {
    try {
        const amount = req.body.amount
        const reciever = req.body.recieverId
        const sender = req.params.senderId
        const deb = await transferMoney(sender, reciever, amount)
        res.status(200).send(deb)
        next()
    } catch (error) {
        res.status(500).send({error: 'An error occurred while fetching deb'})
    }
});

export default router