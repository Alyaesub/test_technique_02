import type { HousingUnit } from '../../types/housingUnit';
import HousingUnitCard from './HousingUnitCard';

interface HousingUnitListProps {
  housingUnits: HousingUnit[];
}

function HousingUnitList({ housingUnits }: HousingUnitListProps) {
  return (
    <div className="housing-list">
      {housingUnits.map((housingUnit) => (
        <HousingUnitCard key={housingUnit.id} housingUnit={housingUnit} />
      ))}
    </div>
  );
}

export default HousingUnitList;