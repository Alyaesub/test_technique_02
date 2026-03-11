import type { HousingUnit } from '../../types/housingUnit';
import { formatStatus } from '../../utils/formStatus';

interface HousingUnitCardProps {
  housingUnit: HousingUnit;
}

function HousingUnitCard({ housingUnit }: HousingUnitCardProps) {
  return (
    <article className="housing-card">
      <div className="housing-card__header">
        <h3 className="housing-card__title">{housingUnit.name}</h3>

        <span
          className={`housing-card__status housing-card__status--${housingUnit.status.toLowerCase()}`}
        >
          {formatStatus(housingUnit.status)}
        </span>
      </div>

      <p className="housing-card__id">ID : {housingUnit.id}</p>
    </article>
  );
}

export default HousingUnitCard;