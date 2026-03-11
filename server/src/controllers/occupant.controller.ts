import type { Request, Response, NextFunction } from 'express'
import { createOccupant } from '../services/occupant.service'
import { getAllOccupants } from '../services/occupant.service';

export async function createOccupantController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const occupant = await createOccupant(req.body)

    return res.status(201).json({
      data: occupant,
    })
  } catch (error) {
    next(error)
  }
}

export async function getOccupantsController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const occupants = await getAllOccupants();

    res.status(200).json({
      data: occupants,
    });
  } catch (error) {
    next(error);
  }
}