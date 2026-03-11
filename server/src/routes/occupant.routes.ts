import { Router } from 'express'
import { validate } from '../middlewares/validate'
import { createOccupantSchema } from '../schemas/occupant.schema'

import { createOccupantController } from '../controllers/occupant.controller'
import { getOccupantsController } from '../controllers/occupant.controller'

const router = Router()

router.post('/', validate(createOccupantSchema), createOccupantController)
router.get('/', getOccupantsController);

export default router