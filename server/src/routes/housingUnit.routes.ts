import { Router } from 'express'
import { createHousingUnitController } from '../controllers/housingUnit.controller'
import { validate } from '../middlewares/validate'
import { createHousingUnitSchema } from '../schemas/housingUnit.schema'
import { getHousingUnitsController } from '../controllers/housingUnit.controller'

const router = Router()

//route qui créé et récupére les logments
router.post('/', validate(createHousingUnitSchema), createHousingUnitController)
router.get('/', getHousingUnitsController)

export default router