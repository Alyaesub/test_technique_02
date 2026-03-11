//controller qui gére la création et la récupération des logment
import type { NextFunction, Request, Response } from 'express'
import { createHousingUnit } from '../services/housingUnit.service'
import { getHousingUnits } from '../services/housingUnit.service'
import { getHousingUnitOccupants } from '../services/housingUnit.service'

//function qui cré un logment
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

//function qui récupére les logements
export async function getHousingUnitsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const housingUnits = await getHousingUnits()

    return res.json({
      data: housingUnits,
    })
  } catch (error) {
    next(error)
  }
}

//function qui recupére le logement et l'occupant assigné
export async function getHousingUnitOccupantsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const housingUnitId = Number(req.params.id)

    //validation typage de l'id
      if (Number.isNaN(housingUnitId)) {
        return res.status(400).json({
          error: "INVALID_ID",
          message: "Housing unit id must be a number"
        })
      }

    const result = await getHousingUnitOccupants(housingUnitId)

    return res.json({
      data: result,
    })
  } catch (error) {
    next(error)
  }
}