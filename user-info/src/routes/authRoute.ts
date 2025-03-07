import express, { Router, Request, Response, NextFunction } from 'express'
import { LoginCredentials } from '../domain/dtos/loginCredentials';
import { RegisterCredentials } from '../domain/dtos/registerCredentials';
import { authentificate, getUserId } from '../middlewares/auth';
import { login, logout, register } from '../services/authService';


const router = Router()


// login
router.post('/login',  async (req: Request<{}, {}, LoginCredentials>, res: Response,  next: NextFunction) => {
      const loginCreds = req.body
      const tokens = await login(loginCreds)
      res.status(200).send(tokens)
      next()
});

// register
router.post('/register', async (req: Request<{}, {}, RegisterCredentials>, res: Response,  next: NextFunction): Promise<void> => {
      const registerCreds = req.body
      const tokens = await register(registerCreds)
      res.status(200).send(tokens)
      next()
});


// logout
router.post('/logout', authentificate, async (req: Request, res: Response,  next: NextFunction) => {
      const token = req.headers['authorization']
      await logout(getUserId(token), token!)
      res.status(200).send('Logged out')
      next()
});


export default router