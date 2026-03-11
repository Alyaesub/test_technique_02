import { apiFetch } from './client';
import type { CreateHousingUnitPayload, HousingUnit } from '../types/housingUnit';
import type { Occupant } from '../types/occupant';

interface HousingUnitsResponse {
  data: HousingUnit[];
}

interface HousingUnitOccupantsResponse {
  data: {
    housingUnit: HousingUnit;
    occupants: Occupant[];
  };
}

export function getHousingUnits() {
  return apiFetch<HousingUnitsResponse>('/housing-units');
}

export function createHousingUnit(payload: CreateHousingUnitPayload) {
  return apiFetch<HousingUnit>('/housing-units', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getHousingUnitOccupants(housingUnitId: string) {
  return apiFetch<HousingUnitOccupantsResponse>(
    `/housing-units/${housingUnitId}/occupants`
  );
}