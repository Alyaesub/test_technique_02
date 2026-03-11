import { Router } from 'express'
import { createOccupantController } from '../controllers/occupant.controller'
import { validate } from '../middlewares/validate'
import { createOccupantSchema } from '../schemas/occupant.schema'

const router = Router()

router.post('/', validate(createOccupantSchema), createOccupantController)

export default router