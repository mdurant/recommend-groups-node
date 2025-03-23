# Documentación de la API

## Endpoints

### GET /api/recommend-groups/:userId
Devuelve una lista de grupos recomendados para un usuario.

#### Parámetros
- `userId` (path): ID del usuario (entero positivo).

#### Respuesta
- **200 OK**: Lista de grupos recomendados.
  ```json
  [
      { "group_id": 2, "group_name": "Viajes", "popularity": 2 },
      { "group_id": 3, "group_name": "Cocina", "popularity": 1 }
  ]