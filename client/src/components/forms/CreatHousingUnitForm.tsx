import { useState } from 'react';
import { createHousingUnit } from '../../api/housingUnitApi';
import type { HousingUnitStatus } from '../../types/housingUnit';

interface CreateHousingUnitFormProps {
  onSuccess: () => Promise<void>;
}

function CreateHousingUnitForm({ onSuccess }: CreateHousingUnitFormProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<HousingUnitStatus>('AVAILABLE');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setError('Le nom du logement est requis.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      await createHousingUnit({
        name: name.trim(),
        status,
      });

      setName('');
      setStatus('AVAILABLE');

      await onSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erreur lors de la création du logement.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="housing-form" onSubmit={handleSubmit}>
      <div className="housing-form__group">
        <label htmlFor="housing-name" className="housing-form__label">
          Nom du logement
        </label>
        <input
          id="housing-name"
          type="text"
          className="housing-form__input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ex : Appartement A14"
        />
      </div>

      <div className="housing-form__group">
        <label htmlFor="housing-status" className="housing-form__label">
          Statut
        </label>
        <select
          id="housing-status"
          className="housing-form__select"
          value={status}
          onChange={(event) => setStatus(event.target.value as HousingUnitStatus)}
        >
          <option value="AVAILABLE">Disponible</option>
          <option value="OCCUPIED">Occupé</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>
      </div>

      {error && <p className="housing-form__error">{error}</p>}

      <button type="submit" className="housing-form__submit" disabled={submitting}>
        {submitting ? 'Création...' : 'Créer le logement'}
      </button>
    </form>
  );
}

export default CreateHousingUnitForm;