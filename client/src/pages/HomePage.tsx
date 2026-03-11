import { useEffect, useState } from 'react';

// Api, utils et types
import { getHealth } from '../api/healthApi';
import { getHousingUnits, deleteHousingUnit } from '../api/housingUnitApi';
import type { HousingUnit } from '../types/housingUnit';

// Components
import HousingUnitList from '../components/housing-units/HousingUnitList';
import CreateHousingUnitForm from '../components/forms/CreatHousingUnitForm';
import CreateOccupantForm from '../components/forms/CreatOccupantForm';
import AssignOccupantForm from '../components/forms/AssignOccupantForm';

function HomePage() {
  const [health, setHealth] = useState<string>('Vérification...');
  const [housingUnits, setHousingUnits] = useState<HousingUnit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState<string>('');

  async function loadHousingUnits() {
    try {
      setError('');
      const response = await getHousingUnits();
      setHousingUnits(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erreur inconnue');
      }
    }
  }

async function handleDeleteHousingUnit(id: number) {
  try {
    await deleteHousingUnit(id);

    setHousingUnits((prev) => prev.filter((unit) => unit.id !== id));
    setError('');
    setSuccessMessage('Logement supprimé avec succès.');
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError('Impossible de supprimer le logement.');
    }

    setSuccessMessage('');
  }
}

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError('');

        const [healthResponse, housingUnitsResponse] = await Promise.all([
          getHealth(),
          getHousingUnits(),
        ]);

        setHealth(healthResponse.message);
        setHousingUnits(housingUnitsResponse.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Erreur inconnue');
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <main>
      <h1>Lynoria - Frontend</h1>

      <section>
        <h2>État de l’API</h2>
        <p>{health}</p>
      </section>

      <section>
        <h2>Créer un logement</h2>
        <CreateHousingUnitForm onSuccess={loadHousingUnits} />
      </section>

      <section>
        <h2>Créer un occupant</h2>
        <CreateOccupantForm />
      </section>

      <section>
        <h2>Affecter un occupant à un logement</h2>
        <AssignOccupantForm onSuccess={loadHousingUnits} />
      </section>

      <section>
        <h2>Liste des logements</h2>


      {successMessage && <p className="housing-form__success">{successMessage}</p>}

        {loading && <p>Chargement...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && housingUnits.length === 0 && (
          <p>Aucun logement trouvé.</p>
        )}

        {!loading && !error && housingUnits.length > 0 && (
          <HousingUnitList
            housingUnits={housingUnits}
            onDelete={handleDeleteHousingUnit}
          />
        )}
      </section>
    </main>
  );
}

export default HomePage;