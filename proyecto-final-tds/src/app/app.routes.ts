import { Routes } from '@angular/router';
import { networkingService } from './networking';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
];

// Buscar usuarios
app.get('/api/users/search', (req, res) => {
  const query = req.query.q as string;
  const results = networkingService.searchUsers(query);
  res.json(results);
});

// Enviar solicitud de conexión
app.post('/api/connections', (req, res) => {
  const { senderId, receiverId } = req.body;
  const connection = networkingService.sendConnectionRequest(senderId, receiverId);
  res.json(connection);
});

// Responder a solicitud de conexión
app.put('/api/connections/:id', (req, res) => {
  const { id } = req.params;
  const { accept } = req.body;
  const updatedConnection = networkingService.respondToConnectionRequest(id, accept);
  if (updatedConnection) {
    res.json(updatedConnection);
  } else {
    res.status(404).json({ error: 'Connection not found' });
  }
});

// Ver conexiones de usuario
app.get('/api/users/:id/connections', (req, res) => {
  const { id } = req.params;
  const connections = networkingService.getUserConnections(id);
  res.json(connections);
});