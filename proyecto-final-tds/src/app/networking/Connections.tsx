import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ConnectionsProps {
  userId: string;
}

interface Connection {
  id: string;
  user1Id: string;
  user2Id: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const Connections: React.FC<ConnectionsProps> = ({ userId }) => {
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    fetchConnections();
  }, [userId]);

  const fetchConnections = async () => {
    try {
      const response = await axios.get<Connection[]>(`/api/users/${userId}/connections`);
      setConnections(response.data);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  };

  return (
    <div>
      <h2>Your Connections</h2>
      <ul>
        {connections.map(connection => (
          <li key={connection.id}>
            {connection.user1Id === userId ? connection.user2Id : connection.user1Id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
