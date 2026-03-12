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
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

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
    <main className="home-page">
      <header className="home-page__hero">
        <div className="home-page__hero-content">
          <p className="home-page__eyebrow">Dashboard de gestion</p>
          <h1 className="home-page__title">Lynoria Housing Manager</h1>
          <p className="home-page__subtitle">
            Gérez vos logements, occupants et affectations depuis une interface
            claire et centralisée.
          </p>
        </div>
      </header>

      <section className="home-page__status-card">
        <div>
          <h2>État de l’API</h2>
          <p>{health}</p>
        </div>
        <span className="home-page__status-badge">En ligne</span>
      </section>

      <section className="home-page__actions">
        <article className="home-page__action-card">
          <div className="home-page__card-header">
            <h2>Créer un logement</h2>
            <p>Ajoute un nouveau logement avec son statut.</p>
          </div>
          <CreateHousingUnitForm onSuccess={loadHousingUnits} />
        </article>

        <article className="home-page__action-card">
          <div className="home-page__card-header">
            <h2>Créer un occupant</h2>
            <p>Enregistre un occupant dans le système.</p>
          </div>
          <CreateOccupantForm />
        </article>

        <article className="home-page__action-card">
          <div className="home-page__card-header">
            <h2>Affecter un occupant</h2>
            <p>Associe rapidement un occupant à un logement.</p>
          </div>
          <AssignOccupantForm onSuccess={loadHousingUnits} />
        </article>
      </section>

      <section className="home-page__housing-section">
        <div className="home-page__section-header">
          <div>
            <p className="home-page__section-label">Parc immobilier</p>
            <h2>Liste des logements</h2>
          </div>
          <div className="home-page__section-count">
            {housingUnits.length} logement{housingUnits.length > 1 ? 's' : ''}
          </div>
        </div>

        {successMessage && (
          <p className="housing-form__success">{successMessage}</p>
        )}

        {loading && <p className="home-page__state-message">Chargement...</p>}
        {error && <p className="home-page__state-message home-page__state-message--error">{error}</p>}

        {!loading && !error && housingUnits.length === 0 && (
          <p className="home-page__state-message">Aucun logement trouvé.</p>
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