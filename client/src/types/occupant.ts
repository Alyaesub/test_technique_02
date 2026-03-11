export interface Occupant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateOccupantPayload {
  firstName: string;
  lastName: string;
  email: string;
}