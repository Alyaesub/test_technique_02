import { Router } from 'express'
import { createAssignmentController } from '../controllers/assignment.controller'
import { validate } from '../middlewares/validate'
import { createAssignmentSchema } from '../schemas/assignment.schema'

const router = Router()

router.post('/', validate(createAssignmentSchema), createAssignmentController)

export default router