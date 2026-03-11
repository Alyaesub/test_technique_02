import { apiFetch } from './client';
import type { CreateOccupantPayload, Occupant } from '../types/occupant';

export function createOccupant(payload: CreateOccupantPayload) {
  return apiFetch<Occupant>('/occupants', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}