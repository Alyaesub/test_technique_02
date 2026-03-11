import { apiFetch } from './client';
import type { CreateOccupantPayload, Occupant } from '../types/occupant';

interface OccupantsResponse {
  data: Occupant[];
}

export function getOccupants() {
  return apiFetch<OccupantsResponse>('/occupants');
}

export function createOccupant(payload: CreateOccupantPayload) {
  return apiFetch<Occupant>('/occupants', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}