import { useEffect, useState } from 'react';
import { getHealth } from '../api/healthApi';
import { getHousingUnits } from '../api/housingUnitApi';
import HousingUnitList from '../components/housing-units/HousingUnitList';
import type { HousingUnit } from '../types/housingUnit';

function HomePage() {
  const [health, setHealth] = useState<string>('Vérification...');
  const [housingUnits, setHousingUnits] = useState<HousingUnit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError('');

        const [healthResponse, housingUnitsResponse] = await Promise.all([
          getHealth(),
          getHousingUnits(),
        ]);

        setHealth(healthResponse.status);
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
        <h2>Liste des logements</h2>

        {loading && <p>Chargement...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && housingUnits.length === 0 && (
          <p>Aucun logement trouvé.</p>
        )}

        {!loading && !error && housingUnits.length > 0 && (
          <HousingUnitList housingUnits={housingUnits} />
        )}
      </section>
    </main>
  );
}

export default HomePage;