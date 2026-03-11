import type { HousingUnitStatus } from '../types/housingUnit';

export function formatStatus(status: HousingUnitStatus): string {
  switch (status) {
    case 'AVAILABLE':
      return 'Disponible';
    case 'OCCUPIED':
      return 'Occupé';
    case 'MAINTENANCE':
      return 'Maintenance';
    default:
      return status;
  }
}