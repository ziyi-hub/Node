# DEMO INTERRUPTION

## Variables d'environnement
- ./service/.env

## Commandes utilities

- Installer les dépendances:
`docker-compose run <nom-du-service> npm i`

- Entrer dans le container :
`docker exec -ti iut-service bash`

- Consulter l'API (le service doit être lancé)
`curl -i localhost:3000`

- Consulter l'application (le service doit être lancé)
`http://localhost:3333/`