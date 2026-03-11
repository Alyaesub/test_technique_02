import { useState } from 'react';
import type { HousingUnit } from '../../types/housingUnit';
import { formatStatus } from '../../utils/formStatus';
import HousingUnitOccupants from './HousingUnitOccupants';

interface HousingUnitCardProps {
  housingUnit: HousingUnit
  onDelete: (id: number) => void
}

function HousingUnitCard({ housingUnit, onDelete  }: HousingUnitCardProps) {
  const [showOccupants, setShowOccupants] = useState(false);

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

      <button
        type="button"
        onClick={() => {
          const confirmed = window.confirm('Supprimer ce logement ?');

          if (confirmed) {
            onDelete(housingUnit.id);
          }
        }}
        className="housing-card__delete"
      >
        Supprimer
      </button>

      <button
        className="housing-card__toggle"
        onClick={() => setShowOccupants(!showOccupants)}
      >
        {showOccupants ? 'Masquer occupants' : 'Voir occupants'}
      </button>

      {showOccupants && (
        <HousingUnitOccupants housingUnitId={housingUnit.id} />
      )}
    </article>
  );
}

export default HousingUnitCard;