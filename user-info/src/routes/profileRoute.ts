import { Router, Request, Response, NextFunction } from 'express'
import { FilteredProfiles } from '../domain/types/filteredProfiles';
import { authentificate, authentificateAdmin, getUserId } from '../middlewares/auth';
import { ProfileDto } from '../domain/dtos/profileDto';
import { grant, profile,users } from '../services/profileService';
import { GrantPermissions } from '../domain/dtos/grantPermissions';


const router = Router()


// profile
router.get('/profile', authentificate, async (req: Request, res: Response<ProfileDto>, next: NextFunction) => {
      const userId = getUserId( req.headers['authorization'])
      const userprofile = await profile(userId)
      res.status(200).send(userprofile)
      next()
});

// get users
router.get('/users', authentificateAdmin, async (req: Request<{}, {} , {}, FilteredProfiles>, res: Response<ProfileDto[]>,  next: NextFunction) => {
      const params = req.query
      const profiles = await users(params)
      res.status(200).send(profiles)
      next()
});

router.post('/grant', authentificateAdmin, async (req: Request<{},{}, GrantPermissions>, res: Response,  next: NextFunction) => {
      const response = await grant(req.body)
      res.status(200).send(response)
      next()
});


export default router