# Contactenboek

## Installatie

### Backend (Laravel)

1. Ga naar de backendmap.
2. Installeer de dependencies:

   composer install

3. Kopieer `.env.example` naar `.env`.
4. Genereer de applicatiesleutel:

   php artisan key:generate

5. Maak de database en voer de migraties en seeders uit:

   php artisan migrate --class=ContactSeeder

6. Start de server:

   php artisan serve

### Frontend (React)

1. Ga naar de frontendmap.
2. Installeer de dependencies:

   npm install

3. Kopieer `.env.example` naar `.env`.
4. Start de applicatie:

   npm start

## Omgevingsvariabelen

- Backend: database-instellingen en `APP_KEY`.
- Frontend: `REACT_APP_API_URL`, de URL van de backend-API.

## Functionaliteiten

- Contacten bekijken en zoeken.
- Contacten sorteren en filteren op favorieten.
- Paginering.
- Contacten toevoegen en bewerken.
- Contacten verwijderen.
- Formuliervalidatie en foutmeldingen.

## Ontwerpkeuzes

- Laravel voor de backend en React voor de frontend.
- SQLite als database.
- Axios voor API-verzoeken.
- Bootstrap voor de vormgeving.

## Bestede tijd

Ik merkte de criteria hiervoor pas vrij laat op, dus ik heb de tijd niet precies bijgehouden.
Maar het was ongeveer 10-12 uur.