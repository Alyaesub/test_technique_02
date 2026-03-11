//controller qui gére la création d'un logment

import type { NextFunction, Request, Response } from 'express'
import { createHousingUnit } from '../services/housingUnit.service'

export async function createHousingUnitController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const housingUnit = await createHousingUnit(req.body)

    return res.status(201).json({
      data: housingUnit,
    })
  } catch (error) {
    next(error)
  }
}