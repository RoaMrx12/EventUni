// src/networking.ts

interface User {
    id: string;
    username: string;
  }
  
  interface Connection {
    id: string;
    user1Id: string;
    user2Id: string;
    status: 'pending' | 'accepted' | 'rejected';
  }
  
  class NetworkingService {
    private users: User[] = [];
    private connections: Connection[] = [];
  
    // Buscar usuarios
    searchUsers(query: string): User[] {
      return this.users.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase())
      );
    }
  
    // Enviar solicitud de conexión
    sendConnectionRequest(senderId: string, receiverId: string): Connection {
      const connection: Connection = {
        id: Date.now().toString(),
        user1Id: senderId,
        user2Id: receiverId,
        status: 'pending'
      };
      this.connections.push(connection);
      return connection;
    }
  
    // Aceptar/rechazar solicitud
    respondToConnectionRequest(connectionId: string, accept: boolean): Connection | null {
      const connection = this.connections.find(c => c.id === connectionId);
      if (connection) {
        connection.status = accept ? 'accepted' : 'rejected';
        return connection;
      }
      return null;
    }
  
    // Ver lista de conexiones
    getUserConnections(userId: string): Connection[] {
      return this.connections.filter(c => 
        (c.user1Id === userId || c.user2Id === userId) && c.status === 'accepted'
      );
    }
  
    // Método auxiliar para añadir usuarios (simulación)
    addUser(user: User): void {
      this.users.push(user);
    }
  }
  
  export const networkingService = new NetworkingService();