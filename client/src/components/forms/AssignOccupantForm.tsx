import { useEffect, useState } from 'react';
import { createAssignment } from '../../api/assignmentApi';
import { getOccupants } from '../../api/occupantApi';
import { getHousingUnits } from '../../api/housingUnitApi';
import type { Occupant } from '../../types/occupant';
import type { HousingUnit } from '../../types/housingUnit';

interface AssignOccupantFormProps {
  onSuccess?: () => Promise<void> | void;
}

function AssignOccupantForm({ onSuccess }: AssignOccupantFormProps) {
  const [occupants, setOccupants] = useState<Occupant[]>([]);
  const [housingUnits, setHousingUnits] = useState<HousingUnit[]>([]);

  const [occupantId, setOccupantId] = useState('');
  const [housingUnitId, setHousingUnitId] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        const occupantsResponse = await getOccupants();
        const housingResponse = await getHousingUnits();

        setOccupants(occupantsResponse.data);
        setHousingUnits(housingResponse.data);
      } catch (err) {
        console.error(err);
        setError('Impossible de charger les données.');
      }
    }

    loadData();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!occupantId || !housingUnitId) {
      setError('Sélection requise.');
      return;
    }

    try {
      setError('');
      setSuccess('');

      await createAssignment({
        occupantId: Number(occupantId),
        housingUnitId: Number(housingUnitId),
      });

      setSuccess('Occupant affecté au logement.');
      setOccupantId('');
      setHousingUnitId('');

      await onSuccess?.();
    } catch (err) {
      console.error(err);
      setError('Erreur lors de l’affectation.');
    }
  }

  return (
    <form className="housing-form" onSubmit={handleSubmit}>
      <div className="housing-form__group">
        <label>Occupant</label>

        <select
          value={occupantId}
          onChange={(e) => setOccupantId(e.target.value)}
          className="housing-form__select"
        >
          <option value="">Choisir un occupant</option>

          {occupants.map((occupant) => (
            <option key={occupant.id} value={occupant.id}>
              {occupant.firstName} {occupant.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="housing-form__group">
        <label>Logement</label>

        <select
          value={housingUnitId}
          onChange={(e) => setHousingUnitId(e.target.value)}
          className="housing-form__select"
        >
          <option value="">Choisir un logement</option>

          {housingUnits.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="housing-form__error">{error}</p>}
      {success && <p className="housing-form__success">{success}</p>}

      <button className="housing-form__submit" type="submit">
        Affecter l’occupant
      </button>
    </form>
  );
}

export default AssignOccupantForm;