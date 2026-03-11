import type { NextFunction, Request, Response } from 'express'
import { createAssignment } from '../services/assignment.service'

//function qui créé l'assignement (la relations)
export async function createAssignmentController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const assignment = await createAssignment(req.body)

    return res.status(201).json({
      data: assignment,
    })
  } catch (error) {
    next(error)
  }
}