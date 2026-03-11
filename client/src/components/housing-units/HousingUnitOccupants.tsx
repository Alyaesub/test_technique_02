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

  if (loading) return <p>Chargement des occupants...</p>;
  if (error) return <p>{error}</p>;
  if (occupants.length === 0) return <p>Aucun occupant.</p>;

  return (
    <ul className="housing-occupants">
      {occupants.map((occupant) => (
        <li key={occupant.id}>
          {occupant.firstName} {occupant.lastName}
        </li>
      ))}
    </ul>
  );
}

export default HousingUnitOccupants;