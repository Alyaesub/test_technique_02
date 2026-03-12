import { useEffect, useState } from 'react';
import { getHousingUnitOccupants } from '../../api/housingUnitApi';
import type { Occupant } from '../../types/occupant';

interface HousingUnitOccupantsProps {
  housingUnitId: number;
}

function HousingUnitOccupants({ housingUnitId }: HousingUnitOccupantsProps) {
  const [occupants, setOccupants] = useState<Occupant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadOccupants() {
      try {
        setLoading(true);
        setError('');

        const response = await getHousingUnitOccupants(String(housingUnitId));
        setOccupants(response.data.occupants);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les occupants.');
      } finally {
        setLoading(false);
      }
    }

    loadOccupants();
  }, [housingUnitId]);

  if (loading) {
    return <p className="housing-occupants__state">Chargement des occupants...</p>;
  }

  if (error) {
    return <p className="housing-occupants__state housing-occupants__state--error">{error}</p>;
  }

  if (occupants.length === 0) {
    return <p className="housing-occupants__state">Aucun occupant pour ce logement.</p>;
  }

  return (
    <div className="housing-occupants">
      <p className="housing-occupants__title">
        Occupants associés ({occupants.length})
      </p>

      <ul className="housing-occupants__list">
        {occupants.map((occupant) => (
          <li key={occupant.id} className="housing-occupants__item">
            <div className="housing-occupants__avatar">
              {occupant.firstName.charAt(0)}
              {occupant.lastName.charAt(0)}
            </div>

            <div className="housing-occupants__content">
              <p className="housing-occupants__name">
                {occupant.firstName} {occupant.lastName}
              </p>
              <p className="housing-occupants__email">{occupant.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HousingUnitOccupants;