import type { HousingUnit } from '../../types/housingUnit';
import HousingUnitCard from './HousingUnitCard';

interface HousingUnitListProps {
  housingUnits: HousingUnit[]
  onDelete: (id: number) => void
}

function HousingUnitList({ housingUnits, onDelete }: HousingUnitListProps) {
  return (
    <div className="housing-list">
      {housingUnits.map((housingUnit) => (
        <HousingUnitCard key={housingUnit.id} housingUnit={housingUnit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default HousingUnitList;