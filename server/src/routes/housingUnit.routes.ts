import { Router } from 'express'
import { validate } from '../middlewares/validate'
import { createHousingUnitSchema,} from '../schemas/housingUnit.schema'
//a refacto si le temps!!!!!
import { createHousingUnitController } from '../controllers/housingUnit.controller'
import { getHousingUnitsController } from '../controllers/housingUnit.controller'
import { getHousingUnitOccupantsController } from '../controllers/housingUnit.controller'

const router = Router()

//route qui créé et récupére les logments et les occupant assigné
router.post('/', validate(createHousingUnitSchema), createHousingUnitController)
router.get('/', getHousingUnitsController)
router.get('/:id/occupants', getHousingUnitOccupantsController)

export default router