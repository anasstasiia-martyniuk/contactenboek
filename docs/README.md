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

   php artisan migrate --seed

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

## Wat is af en wat niet?

### Af:
De hierboven beschreven functionaliteiten.

### Nog te controleren:
Alle randgevallen uit de opdracht.
De consistentie van foutmeldingen en API-validatie.

## Randgevallen 

Randgevallen die moeten werken:
•	Je verwijdert het laatste contact op de laatste pagina. Je komt op de pagina daarvoor, niet op "Pagina 4 van 3".
•	Je klikt twee keer snel op Opslaan. Er komt maar één contact bij.
•	De API staat uit. Je ziet een foutmelding, geen lege lijst.
•	Je zoekt terwijl je op pagina 5 staat. Je ziet pagina 1 van de zoekresultaten.
•	Je bewerkt een contact en verandert alleen het telefoonnummer. Opslaan lukt.
•	Je zoekt op "JAN" en daarna op "jan". Je krijgt dezelfde resultaten.


## Bestede tijd

Ik merkte de criteria hiervoor pas vrij laat op, dus ik heb de tijd niet precies bijgehouden.
Maar het was ongeveer 10-12 uur.