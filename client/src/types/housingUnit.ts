export type HousingUnitStatus = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';

export interface HousingUnit {
  id: number;
  name: string;
  status: HousingUnitStatus;
}

export interface CreateHousingUnitPayload {
  name: string;
  status: HousingUnitStatus;
}