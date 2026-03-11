import { Router } from 'express'
import { createHousingUnitController } from '../controllers/housingUnit.controller'
import { validate } from '../middlewares/validate'
import { createHousingUnitSchema } from '../schemas/housingUnit.schema'

const router = Router()

router.post('/', validate(createHousingUnitSchema), createHousingUnitController)

export default router