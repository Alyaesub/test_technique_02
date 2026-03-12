import { useState } from 'react';
import { createOccupant } from '../../api/occupantApi';

function CreateOccupantForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError('Tous les champs sont requis.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      setSuccessMessage('');

      await createOccupant({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });

      setFirstName('');
      setLastName('');
      setEmail('');
      setSuccessMessage('Occupant créé avec succès.');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur lors de la création de l'occupant.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="housing-form housing-form--card" onSubmit={handleSubmit}>
      <div className="housing-form__grid">

        <div className="housing-form__group">
          <label htmlFor="occupant-first-name" className="housing-form__label">
            Prénom
          </label>
          <input
            id="occupant-first-name"
            type="text"
            className="housing-form__input"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Ex : John"
          />
        </div>

        <div className="housing-form__group">
          <label htmlFor="occupant-last-name" className="housing-form__label">
            Nom
          </label>
          <input
            id="occupant-last-name"
            type="text"
            className="housing-form__input"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Ex : Doe"
          />
        </div>

        <div className="housing-form__group housing-form__group--full">
          <label htmlFor="occupant-email" className="housing-form__label">
            Email
          </label>
          <input
            id="occupant-email"
            type="email"
            className="housing-form__input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Ex : john@test.fr"
          />
        </div>

      </div>

      <div className="housing-form__footer">
        <div className="housing-form__feedback">
          {error && <p className="housing-form__error">{error}</p>}
          {successMessage && (
            <p className="housing-form__success">{successMessage}</p>
          )}
        </div>

        <button
          type="submit"
          className="housing-form__submit"
          disabled={submitting}
        >
          {submitting ? 'Création...' : "Créer l'occupant"}
        </button>
      </div>
    </form>
  );
}

export default CreateOccupantForm;