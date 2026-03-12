import { useState } from 'react';
import type { HousingUnit } from '../../types/housingUnit';
import { formatStatus } from '../../utils/formStatus';
import HousingUnitOccupants from './HousingUnitOccupants';

interface HousingUnitCardProps {
  housingUnit: HousingUnit;
  onDelete: (id: number) => void;
}

function HousingUnitCard({ housingUnit, onDelete }: HousingUnitCardProps) {
  const [showOccupants, setShowOccupants] = useState(false);

  function handleDelete() {
    const confirmed = window.confirm('Supprimer ce logement ?');

    if (confirmed) {
      onDelete(housingUnit.id);
    }
  }

  return (
    <article className="housing-card">
      <div className="housing-card__header">
        <div className="housing-card__heading">
          <p className="housing-card__eyebrow">Logement</p>
          <h3 className="housing-card__title">{housingUnit.name}</h3>
          <p className="housing-card__meta">
            ID: {housingUnit.id}
          </p>
        </div>

        <span
          className={`housing-card__status housing-card__status--${housingUnit.status.toLowerCase()}`}
        >
          {formatStatus(housingUnit.status)}
        </span>
      </div>

      <div className="housing-card__body">
        <p className="housing-card__description">
          Consultez les occupants associés à ce logement ou gérez sa suppression.
        </p>
      </div>

      <div className="housing-card__actions">
        <button
          type="button"
          className="housing-card__button housing-card__button--ghost"
          onClick={() => setShowOccupants(!showOccupants)}
        >
          {showOccupants ? 'Masquer occupants' : 'Voir occupants'}
        </button>

        <button
          type="button"
          className="housing-card__button housing-card__button--danger"
          onClick={handleDelete}
        >
          Supprimer
        </button>
      </div>

      {showOccupants && (
        <div className="housing-card__occupants">
          <HousingUnitOccupants housingUnitId={housingUnit.id} />
        </div>
      )}
    </article>
  );
}

export default HousingUnitCard;