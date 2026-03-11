export type HousingUnitStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';

export interface HousingUnit {
  id: string;
  name: string;
  status: HousingUnitStatus;
}

export interface CreateHousingUnitPayload {
  name: string;
  status: HousingUnitStatus;
}